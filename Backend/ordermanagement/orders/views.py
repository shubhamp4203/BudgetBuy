from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from orders.models import User_Order, Cart, Cart_item, User_Order_item, Seller_Order, Seller_Order_item
from orders.serializers import OrderItemSerializer, OrderSerializer, CartSerializer, CartItemSerializer, SellerOrderItemSerializer, SellerOrderSerializer
from rest_framework.decorators import  api_view
from rest_framework import status
from rest_framework.response import Response
import json
import requests
import responses
from django.shortcuts import get_object_or_404
from ordermanagement.settings import micro_services

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
def createCart(request):
    try:
        data = JSONParser().parse(request)
        user_id = data['user_id']
        email = data['useremail']
        cart = Cart.objects.create(user_id=user_id, user_email=email)
        cart.save()
        print("print sucecss")
        return Response({'message': 'Cart created successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
def addCart(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        user_id = data['user_id']
        product_id = data['product_id']
        seller_id = data['seller_id']
        cart = Cart.objects.filter(user_id=user_id).first()
        if not cart:
            cart = Cart.objects.create(user_id=user_id)
        item = Cart_item.objects.filter(user_id=user_id, product_id=product_id).first()
        cart.total_value += data['amount'] * data['product_price']
        if item:
            data['amount'] += item.amount
            stock_check = requests.post(f"{micro_services['inventory']}/checkStock/", json={'product_id': product_id, 'amount': data['amount']})
            stock_check = stock_check.json()
            if(stock_check['status']):
                cart.status = "stock_unavailable"
                cart.out_of_stock += 1
                data['status'] = "stock_unavailable"
            serializer = CartItemSerializer(item, data=data)
        else:
            stock_check = requests.post(f"{micro_services['inventory']}/checkStock/", json={'product_id': product_id, 'amount': data['amount']})
            stock_check = stock_check.json()
            if(stock_check['status']):
                cart.status = "stock_unavailable"
                cart.out_of_stock += 1
                data['status'] = "stock_unavailable"
            serializer = CartItemSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            cart.save()
            return Response({'prod': serializer.data, 'cartValue': cart.total_value}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@csrf_exempt
@api_view(['GET'])
def getCart(request):
    if request.method == 'GET':
        user_id = request.GET.get('user_id')
        cart = Cart.objects.filter(user_id=user_id).first()
        items = Cart_item.objects.filter(user_id=user_id)
        if not items:
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            prod_ids = list(items.values_list('product_id', flat=True))
            prodInfo = test_func(prod_ids)
            items = Cart_item.objects.filter(user_id=user_id)
            serializer = CartItemSerializer(items, many=True)
            for i in serializer.data:
                i.update(prodInfo['data'][i['product_id']])
        reqData = {'items': serializer.data, 'cartValue': cart.total_value}
        return Response(reqData, status=status.HTTP_200_OK)
    
    
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
            stock_check = requests.post(f"{micro_services['inventory']}/checkStock/", json={'product_id': prod_id, 'amount': item.amount})
            stock_check = stock_check.json()
            if not stock_check['status']:
                item.status = "available"
                cart.out_of_stock -= 1
                if cart.out_of_stock == 0:
                    cart.status = "available"
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
            if item.status == "stock_unavailable":
                cart.out_of_stock -= 1
            if cart.out_of_stock == 0:
                cart.status = "available"
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
@api_view(['POST'])
def addOrder(request):
    try:
        data = JSONParser().parse(request)
        user_id = data['user_id']
        shipping_address = data['address']
        payment_method = data['payment_method']
        cart = get_object_or_404(Cart, user_id=user_id)
        user_email = cart.user_email
        items = Cart_item.objects.filter(user_id=user_id)

        #user order saving
        user_order = User_Order.objects.create(user_id=user_id, shipping_address=shipping_address, payment_method=payment_method, total_value=cart.total_value)
        user_order.order_status = "order_placed"
        user_order.item_count = items.count()
        user_order.save()
        for item in items:
            order_item = User_Order_item.objects.create(user_order_id=user_order, product_id=item.product_id, amount=item.amount, item_status="pending")
            order_item.save()

        #seller order saving
        seller_ids = set(items.values_list('seller_id', flat=True))
        for i in seller_ids:
            seller_order = Seller_Order.objects.create(user_email=user_email, user_id=user_id, shipping_address=shipping_address, payment_method=payment_method, seller_id=i, user_order_id=user_order.user_order_id)
            seller_items = items.filter(seller_id=i)
            seller_value = 0
            for item in seller_items:
                seller_order_item = Seller_Order_item.objects.create(seller_order_id=seller_order, product_id=item.product_id, amount=item.amount)
                seller_value += item.amount * item.product_price
                seller_order_item.save()
            seller_order.total_value = seller_value
            seller_order.order_status = "pending"
            seller_order.save()
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    
    update_data = {'products': []}  
    for item in items:
        update_data['products'].append({'product_id': item.product_id, 'amount': item.amount})
    stock_update = requests.post(f"{micro_services['inventory']}/updateStock/", json=update_data)
    items.delete()
    cart.total_value = 0
    cart.status = "available"
    cart.save()
    return Response(status=status.HTTP_201_CREATED)

@csrf_exempt
@api_view(['POST'])
def orderDelivered(request):
    try:
        data = JSONParser().parse(request)
        order_id = data['order_id']
        seller_id = data['seller_id']
        order = get_object_or_404(Seller_Order, seller_order_id=order_id, seller_id=seller_id)
        order.order_status = "DELIVERED"
        order.save()

        order_items = Seller_Order_item.objects.filter(seller_order_id=order_id)
        user_order = get_object_or_404(User_Order, user_order_id=order.user_order_id)
        for i in order_items:
            user_item = User_Order_item.objects.get(user_order_id=user_order, product_id=i.product_id)
            user_item.item_status = "DELIVERED"
            user_order.item_count -= 1
            if(user_order.item_count == 0):
                user_order.order_status = "DELIVERED"
            user_item.save()
        user_order.save()
        return Response({'message': 'Order status updated successfully'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['GET'])
def getUserOrder(request):
    user_id = request.GET.get('user_id')
    order_status = request.GET.get('status')
    if(order_status=="ALL"):
        orders = User_Order.objects.filter(user_id=user_id)
    else:
        orders = User_Order.objects.filter(user_id=user_id, order_status=order_status)
    if not orders:
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        order_data = OrderSerializer(orders, many=True)
        reqData = {'orders': order_data.data}
        return Response(reqData, status=status.HTTP_200_OK)

@csrf_exempt
@api_view(['GET'])
def getSellerOrder(request):
    seller_id = request.GET.get('seller_id')
    order_status = request.GET.get('status')
    if(order_status=="ALL"):
        orders = Seller_Order.objects.filter(seller_id=seller_id)
    else:
        orders = Seller_Order.objects.filter(seller_id=seller_id, order_status=order_status)
    if not orders:
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        order_data = SellerOrderSerializer(orders, many=True)
        reqData = {'orders': order_data.data}
        return Response(reqData, status=status.HTTP_200_OK)
    
@csrf_exempt
@api_view(['GET'])
def getUserOrderItems(request):
    order_id = request.GET.get('order_id')
    order = get_object_or_404(User_Order, user_order_id=order_id)
    items = User_Order_item.objects.filter(user_order_id=order_id)
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
    
@csrf_exempt
@api_view(['GET'])
def getSellerOrderItems(request):
    order_id = request.GET.get('order_id')
    order = get_object_or_404(Seller_Order, seller_order_id=order_id)
    items = Seller_Order_item.objects.filter(seller_order_id=order_id)
    if not items:
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        item_data = SellerOrderItemSerializer(items, many=True)
        prod_ids = items.values_list('product_id', flat=True)
        prodInfo = test_func(prod_ids)
        for i in item_data.data:
            i.update(prodInfo['data'][i['product_id']])
        reqData = {'items': item_data.data, 'total_value': order.total_value}
        return Response(reqData, status=status.HTTP_200_OK)