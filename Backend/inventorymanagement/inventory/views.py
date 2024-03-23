from math import prod
from re import S
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from inventory.models import Inventory
from django.shortcuts import get_object_or_404
from rest_framework.decorators import renderer_classes, api_view
from rest_framework import status
from rest_framework.response import Response

def test_func(arg):
    resDict = {'products':[]}
    for i in arg:
        tmpdict = {}
        tmpdict['product_id'] = i
        tmpdict['product_name'] = f"Product {i}"
        tmpdict['product_img'] = f"Product {i} Image"
        tmpdict['price'] = f"Price {i}"
        resDict['products'].append(tmpdict)
    return resDict

@csrf_exempt
@api_view(['POST'])
def addStock(request):
    try:
        data = JSONParser().parse(request)
        products = data['products']
        for product in products:
            sku_id = product['sku_id']
            seller_id = product['seller_id']
            stock = product['stock']
            product_id = product['product_id']
            inventory = Inventory.objects.create(sku_id=sku_id, seller_id=seller_id, product_stock=stock, product_id=product_id)
            inventory.save()
        return Response({'message': 'Stock added successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET'])
def getInventory(request):
    try:    
        seller_id = request.query_params.get('seller_id')
        inventory = Inventory.objects.filter(seller_id=seller_id)
        prod_ids = inventory.values_list('product_id', flat=True)
        prod_info = test_func(list(prod_ids))
        for i in prod_info['products']:
            i['stock'] = inventory.get(product_id=i['product_id']).product_stock
            i['sku_id'] = inventory.get(product_id=i['product_id']).sku_id
        return Response(prod_info, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

