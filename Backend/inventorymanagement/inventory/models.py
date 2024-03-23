from email.policy import default
from enum import unique
from django.db import models

class Inventory(models.Model):
    product_id = models.IntegerField(primary_key=True)
    product_stock = models.IntegerField()
    seller_id = models.IntegerField()
    sku_id = models.CharField(max_length=50, null=False, default="")

    class Meta:
        db_table = 'inventory'

    
