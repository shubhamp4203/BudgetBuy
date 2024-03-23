from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from orders.models import Order, Cart, Cart_item, Order_item
from orders.serializers import OrderItemSerializer, OrderSerializer, CartSerializer, CartItemSerializer
from rest_framework.decorators import renderer_classes, api_view
from rest_framework import status
from rest_framework.response import Response
import json
import requests
import responses
from django.shortcuts import get_object_or_404

def test_func(arg):
    resDict = {'data':{}}
    for i in arg:
        tmpdict = {}
        tmpdict[i] = {}
        tmpdict[i]['product_name'] = f"Product {i}"
        tmpdict[i]['product_img'] = f"Product {i} Image"
        resDict['data'].update(tmpdict)
    return resDict

@csrf_exempt
@api_view(['POST'])
def addCart(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        user_id = data['user_id']
        product_id = data['product_id']
        cart = Cart.objects.filter(user_id=user_id).first()
        if not cart:
            cart = Cart.objects.create(user_id=user_id)
        item = Cart_item.objects.filter(user_id=user_id, product_id=product_id).first()
        cart.total_value += data['amount'] * data['product_price']
        if item:
            data['amount'] += item.amount
            serializer = CartItemSerializer(item, data=data)
        else:
            serializer = CartItemSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            cart.save()
            return Response({'prod': serializer.data, 'cartValue': cart.total_value}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@csrf_exempt
@api_view(['DELETE'])
def delCart(request):
    if request.method == 'DELETE':
        data = JSONParser().parse(request)
        reqType = data['type']
        user_id = data['user_id']
        prod_id = data['product_id']
        if reqType == 'subItem':
            cart = get_object_or_404(Cart, user_id=user_id)
            item = get_object_or_404(Cart_item, product_id=prod_id, user_id=user_id)
            item.amount -= 1
            cart.total_value -= item.product_price
            retData = {'updatedAmount': item.amount}
            item.save()
            cart.save()
            return Response(retData, status=status.HTTP_200_OK)
        elif reqType == "remItem":
            cart = get_object_or_404(Cart, user_id=user_id)
            items = Cart_item.objects.filter(user_id=user_id, product_id=prod_id)
            item = items.first()
            cart.total_value -= item.amount * item.product_price
            items.delete()
            cart.save()
            retItems = Cart_item.objects.filter(user_id=user_id)  
            serializer = CartItemSerializer(retItems, many=True)
            if not serializer.data:
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                prod_ids = [item.product_id for item in retItems]
                prodInfo = test_func(prod_ids)
                for i in serializer.data:
                    i.update(prodInfo['data'][i['product_id']])
            reqData = {'items': serializer.data, 'cartValue': cart.total_value}
            return Response(reqData, status=status.HTTP_200_OK)

@csrf_exempt
@api_view(['GET'])
def getCart(request):
    if request.method == 'GET':
        user_id = request.GET.get('user_id')
        cart = Cart.objects.filter(user_id=user_id).first()
        items = Cart_item.objects.filter(user_id=user_id)
        serializer = CartItemSerializer(items, many=True)
        if not serializer.data:
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            prod_ids = items.values_list('product_id', flat=True)
            prodInfo = test_func(prod_ids)
            for i in serializer.data:
                i.update(prodInfo['data'][i['product_id']])
        reqData = {'items': serializer.data, 'cartValue': cart.total_value}
        return Response(reqData, status=status.HTTP_200_OK)
    
@csrf_exempt
@api_view(['POST'])
def addOrder(request):
    data = JSONParser().parse(request)
    user_id = data['user_id']
    shipping_address = data['address']
    payment_method = data['payment_method']
    cart = get_object_or_404(Cart, user_id=user_id)
    items = Cart_item.objects.filter(user_id=user_id)
    order = Order.objects.create(user_id=user_id, shipping_address=shipping_address, payment_method=payment_method, total_value=cart.total_value)
    order.order_status = "order_placed"
    order.save()
    for item in items:
        order_item = Order_item.objects.create(order_id=order, product_id=item.product_id, amount=item.amount)
        order_item.save()
    items.delete()
    cart.total_value = 0
    cart.save()
    return Response(status=status.HTTP_201_CREATED)

@csrf_exempt
@api_view(['GET'])
def getOrder(request):
    user_id = request.GET.get('user_id')
    order_status = request.GET.get('status')
    if(order_status=="ALL"):
        orders = Order.objects.filter(user_id=user_id)
    else:
        orders = Order.objects.filter(user_id=user_id, order_status=order_status)
    if not orders:
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        order_data = OrderSerializer(orders, many=True)
        reqData = {'orders': order_data.data}
        return Response(reqData, status=status.HTTP_200_OK)
    
@csrf_exempt
@api_view(['GET'])
def getOrderItems(request):
    order_id = request.GET.get('order_id')
    order = get_object_or_404(Order, order_id=order_id)
    items = Order_item.objects.filter(order_id=order_id)
    if not items:
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        item_data = OrderItemSerializer(items, many=True)
        prod_ids = items.values_list('product_id', flat=True)
        prodInfo = test_func(prod_ids)
        for i in item_data.data:
            i.update(prodInfo['data'][i['product_id']])
        reqData = {'items': item_data.data, 'total_value': order.total_value}
        return Response(reqData, status=status.HTTP_200_OK)
        


