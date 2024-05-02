from django.db import models
from django.utils import timezone

class User_Order(models.Model):
    user_order_id = models.BigAutoField(primary_key=True)
    order_date = models.DateTimeField(default=timezone.now)
    order_status = models.CharField(max_length=50, null=True)
    user_id = models.CharField(max_length=100)   
    shipping_address = models.CharField(max_length=200, null=True)
    total_value = models.IntegerField(null=True, default=0)
    payment_method = models.CharField(max_length=50, null=True) 
    item_count = models.IntegerField(null=True, default=0)
    seller_id = models.CharField(max_length=100, null=True)

    class Meta:
        db_table = 'user_order' 
    
class Seller_Order(models.Model):
    seller_order_id = models.BigAutoField(primary_key=True)
    order_date = models.DateTimeField(default=timezone.now)
    order_status = models.CharField(max_length=50, null=True)
    user_id = models.CharField(max_length=100)   
    shipping_address = models.CharField(max_length=200, null=True)
    total_value = models.IntegerField(null=True, default=0)
    payment_method = models.CharField(max_length=50, null=True) 
    seller_id = models.CharField(max_length=100, null=True)
    user_order_id = models.BigIntegerField(null=True)
    user_email = models.EmailField(max_length=255, null=True)

    class Meta:
        db_table = 'seller_order'

class Seller_Order_item(models.Model):
    seller_order_id = models.ForeignKey(Seller_Order, on_delete=models.CASCADE)
    product_id = models.CharField(max_length=100, null=True)
    amount = models.IntegerField(null=True)
    
    class Meta:
        db_table = 'seller_order_item'

class User_Order_item(models.Model):
    user_order_id = models.ForeignKey(User_Order, on_delete=models.CASCADE)
    product_id = models.CharField(max_length=100, null=True)  
    amount = models.IntegerField(null=True)
    item_status = models.CharField(max_length=50, null=True)
    
    class Meta:
        db_table = 'user_order_item'

class Cart(models.Model):
    user_id = models.CharField(max_length=100, unique=True,primary_key=True)    
    total_value = models.IntegerField(null=True, default=0)
    status = models.BooleanField(default=True)
    out_of_stock = models.IntegerField(null=True, default=0)
    user_email = models.EmailField(max_length=255, null=True, unique = True)

    class Meta:
        db_table = 'cart'


class Cart_item(models.Model):
    product_id = models.CharField(max_length=100, null=True)
    user_id = models.ForeignKey(Cart, on_delete=models.CASCADE)
    amount = models.IntegerField(null=True)
    product_price = models.IntegerField(null=True)
    status = models.BooleanField(default=True)
    seller_id = models.CharField(max_length=100, null=True)

    class Meta:
        db_table = 'cart_item'


