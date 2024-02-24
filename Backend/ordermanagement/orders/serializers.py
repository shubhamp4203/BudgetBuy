from rest_framework import serializers
from orders.models import Order, Cart, Cart_item, Order_item

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order_item
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart_item
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'
            



