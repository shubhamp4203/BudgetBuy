from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from orders.models import Order, Cart, Cart_item, Order_item
from orders.serializers import OrderSerializer, CartSerializer, CartItemSerializer
from rest_framework.decorators import renderer_classes, api_view
from rest_framework import status
from rest_framework.response import Response
import json
from django.shortcuts import get_object_or_404

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
            return Response(serializer.data, status=status.HTTP_201_CREATED)
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
            retItems = Cart_item.objects.all()  
            serializer = CartItemSerializer(retItems, many=True)
            reqData = {'items': serializer.data, 'cartValue': cart.total_value}
            return Response(reqData, status=status.HTTP_200_OK)

