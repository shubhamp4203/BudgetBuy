# Generated by Django 5.0 on 2024-03-22 05:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Inventory',
            fields=[
                ('product_id', models.AutoField(primary_key=True, serialize=False)),
                ('product_stock', models.IntegerField()),
                ('seller_id', models.IntegerField()),
            ],
        ),
    ]