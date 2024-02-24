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
        cart = get_object_or_404(Cart, user_id=user_id)
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