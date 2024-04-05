from django.db import models

class Inventory(models.Model):
    product_id = models.CharField(max_length=100, unique=True,primary_key=True)  
    product_stock = models.IntegerField()
    seller_id = models.CharField(max_length=100, null=True)  
    sku_id = models.CharField(max_length=50, null=False, default="")

    class Meta:
        db_table = 'inventory'

    
