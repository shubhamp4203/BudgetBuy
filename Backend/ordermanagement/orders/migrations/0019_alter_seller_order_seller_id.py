# Generated by Django 5.0 on 2024-04-05 11:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0018_alter_cart_item_product_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='seller_order',
            name='seller_id',
            field=models.CharField(max_length=100, null=True),
        ),
    ]