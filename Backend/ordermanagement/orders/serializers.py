from rest_framework import serializers
from orders.models import User_Order, Cart, Cart_item, User_Order_item, Seller_Order, Seller_Order_item

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Order_item
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart_item
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Order
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'
            
class SellerOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller_Order
        fields = '__all__'

class SellerOrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller_Order_item
        fields = '__all__'



