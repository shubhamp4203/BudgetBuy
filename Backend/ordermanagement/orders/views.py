from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from orders.models import User_Order, Cart, Cart_item, User_Order_item, Seller_Order, Seller_Order_item
from orders.serializers import OrderItemSerializer, OrderSerializer, CartSerializer, CartItemSerializer, SellerOrderItemSerializer, SellerOrderSerializer
from rest_framework.decorators import  api_view
from rest_framework import status
from rest_framework.response import Response
from pathlib import Path
import requests
from django.shortcuts import get_object_or_404
from ordermanagement.settings import micro_services
import json
from django.template.loader import get_template
from weasyprint import HTML
import os
from django.shortcuts import render


def test_func(arg):
    resDict = {'data':{}}
    for i in arg:
        tmpdict = {}
        tmpdict[i] = {}
        tmpdict[i]['product_name'] = f"Product {i}"
        tmpdict[i]['product_img'] = f"Product {i} Image"
        resDict['data'].update(tmpdict)
    return resDict

@csrf_exempt
@api_view(['POST'])
def createCart(request):
    try:
        data = JSONParser().parse(request)
        user_id = data['user_id']
        email = data['useremail']
        cart = Cart.objects.create(user_id=user_id, user_email=email)
        cart.save()
        return Response({'message': 'Cart created successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
def addCart(request):
    data = JSONParser().parse(request)
    user_id = data['user_id']
    product_id = data['product_id']
    seller_id = data['seller_id']
    data['product_price'] = int(data['product_price'])
    cart = Cart.objects.filter(user_id=user_id).first()
    if not cart:
        cart = Cart.objects.create(user_id=user_id)
    item = Cart_item.objects.filter(user_id=user_id, product_id=product_id).first()
    cart.total_value += data['amount'] * data['product_price']
    if item:
        data['amount'] += item.amount
        stock_check = requests.post(f"{micro_services['INVENTORY']}/checkStock/", json={'product_id': product_id, 'amount': data['amount']})
        stock_check = stock_check.json()
        if(stock_check['status']):
            cart.status = False
            cart.out_of_stock += 1
            data['status'] = False
        serializer = CartItemSerializer(item, data=data)
    else:
        stock_check = requests.post(f"{micro_services['INVENTORY']}/checkStock/", json={'product_id': product_id, 'amount': data['amount']})
        stock_check = stock_check.json()
        if(stock_check['status']):
            cart.status = False
            cart.out_of_stock += 1
            data['status'] = False
        serializer = CartItemSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        cart.save()
        return Response({'prod': serializer.data, 'cartValue': cart.total_value}, status=status.HTTP_201_CREATED)
    
@csrf_exempt
@api_view(['GET'])
def getCart(request):
    user_id = request.GET.get('user_id')
    cart = Cart.objects.get(user_id=user_id)
    items = Cart_item.objects.filter(user_id=user_id)
    cart_data = CartSerializer(cart)
    if not items:
        return Response({"message": "Cart is empty"}, status=status.HTTP_204_NO_CONTENT)
    else:
        item_data = CartItemSerializer(items, many=True)
        prod_ids = {'products': list(items.values_list('product_id', flat=True)), 'type': "Cart"}
        productInfo = requests.post(f"{micro_services['PRODUCT']}/getproduct", json=prod_ids)
        if(productInfo.status_code==200):
            productInfo = productInfo.json()
            for i in item_data.data:
                for j in productInfo["result"]:
                    if(i['product_id'] == j['_id']):
                        i["name"] = j['newProduct']["name"]
                        break
            return Response({"cart": cart_data.data, "products": item_data.data}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Something went wrong"}, status=status.HTTP_400_BAD_REQUEST)
    
@csrf_exempt
@api_view(['DELETE'])
def delCart(request):
    data = JSONParser().parse(request)
    reqType = data['type']
    user_id = data['user_id']
    prod_id = data['product_id']
    if reqType == 'subItem':
        cart = get_object_or_404(Cart, user_id=user_id)
        item = get_object_or_404(Cart_item, product_id=prod_id, user_id=user_id)
        item.amount -= 1
        stock_check = requests.post(f"{micro_services['INVENTORY']}/checkStock/", json={'product_id': prod_id, 'amount': item.amount})
        stock_check = stock_check.json()
        if not stock_check['status']:
            item.status = True
            cart.out_of_stock -= 1
            if cart.out_of_stock == 0:
                cart.status = True
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
        if item.status == False:
            cart.out_of_stock -= 1
        if cart.out_of_stock == 0:
            cart.status = True
        items.delete()
        cart.save()
        retItems = Cart_item.objects.filter(user_id=user_id)  
        serializer = CartItemSerializer(retItems, many=True)
        if not serializer.data:
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            prod_ids = [item.product_id for item in retItems]
            prodInfo = test_func(prod_ids)
            for i in serializer.data:
                i.update(prodInfo['data'][i['product_id']])
        reqData = {'items': serializer.data, 'cartValue': cart.total_value}
        return Response(reqData, status=status.HTTP_200_OK)
   
def generate_invoice_pdf(order, items):
    try:
        for item in items:
            item['subtotal'] = item['amount']*item['product_price']
        template = get_template('invoice.html')
        html_content = template.render({
            "order": order,
            "items": items
        })   
        pdf_path = f'./invoices/invoice_{order.user_order_id}.pdf'
        pdf = HTML(string=html_content).write_pdf(pdf_path)
    except Exception as e:
        print(e)

@csrf_exempt
@api_view(['POST'])
def addOrder(request):
    try:
        data = JSONParser().parse(request)
        user_id = data['user_id']
        shipping_address = data['address'].split('Address:')[1]
        payment_method = data['payment_method']
        cart = get_object_or_404(Cart, user_id=user_id)
        user_email = cart.user_email
        items = Cart_item.objects.filter(user_id=user_id)
        sellers = list(set(items.values_list('seller_id', flat=True)))

        #user order saving
        for seller in sellers:
            user_order =  User_Order.objects.create(user_id=user_id, shipping_address=shipping_address, payment_method=payment_method, seller_id=seller, total_value=0)
            user_order.order_status = "Pending"
            ind_seller_items = items.filter(seller_id=seller)
            ind_items = CartItemSerializer(ind_seller_items, many=True)
            prod_ids = {'products': list(ind_seller_items.values_list('product_id', flat=True)), 'type': "Cart"}
            productInfo = requests.post(f"{micro_services['PRODUCT']}/getproduct", json=prod_ids)
            if(productInfo.status_code==200):
                productInfo = productInfo.json()
                for i in ind_items.data:
                    for j in productInfo["result"]:
                        if(i['product_id'] == j['_id']):
                            i["name"] = j['newProduct']["name"]
                            break
            order_amt = 0
            item_cnt=ind_seller_items.count()
            user_order.item_count = item_cnt
            for item in ind_seller_items:
                order_amt += item.amount * item.product_price
                order_item = User_Order_item.objects.create(user_order_id=user_order, product_id=item.product_id, amount=item.amount, item_status="pending")
                order_item.save()
            user_order.total_value = order_amt
            user_order.save()
            generate_invoice_pdf(user_order, ind_items.data)
            userresp = requests.post(f"{micro_services['EMAIL']}/userOrderMail/", json={'user_email': user_email, 'order_id': user_order.user_order_id})

            seller_order = Seller_Order.objects.create(user_email=user_email, user_id=user_id, shipping_address=shipping_address, payment_method=payment_method, seller_id=seller, user_order_id=user_order.user_order_id)
            seller_value = 0
            for item in ind_seller_items:
                seller_order_item = Seller_Order_item.objects.create(seller_order_id=seller_order, product_id=item.product_id, amount=item.amount)
                seller_value += item.amount * item.product_price
                seller_order_item.save()
            seller_order.total_value = seller_value
            seller_order.order_status = "Pending"
            seller_order.save()
            sellerresp = requests.post(f"{micro_services['EMAIL']}/sellerOrderMail/", json={'seller_id_list': sellers})
        
        update_data = {'products': []}  
        for item in items:
            update_data['products'].append({'product_id': item.product_id, 'amount': item.amount})
        stock_update = requests.post(f"{micro_services['INVENTORY']}/updateStock/", json=update_data)
        items.delete()
        cart.total_value = 0
        cart.status = True
        cart.out_of_stock = 0
        cart.user_email = user_email
        cart.save()
        return Response({'message': 'Order placed successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        print(str(e))
        seller_orders = Seller_Order.objects.filter(user_order_id=user_order.user_order_id)
        seller_items = Seller_Order_item.objects.filter(seller_order_id__in=seller_orders)
        seller_items.delete()
        seller_orders.delete()
        user_items = User_Order_item.objects.filter(user_order_id=user_order)
        user_items.delete()
        user_order.delete()
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
def orderDelivered(request):
    try:
        data = JSONParser().parse(request)
        order_id = data['order_id']
        seller_id = data['seller_id']
        order = get_object_or_404(Seller_Order, user_order_id=order_id, seller_id=seller_id)
        order.order_status = "Delivered"
        order.save()

        order_items = Seller_Order_item.objects.filter(seller_order_id=order.seller_order_id)
        user_order = get_object_or_404(User_Order, user_order_id=order.user_order_id)
        for i in order_items:
            user_item = User_Order_item.objects.get(user_order_id=user_order, product_id=i.product_id)
            user_item.item_status = "Delivered"
            user_order.item_count -= 1
            if(user_order.item_count == 0):
                user_order.order_status = "Delivered"
            user_item.save()
        user_order.save()
        return Response({'message': 'Order status updated successfully'}, status=status.HTTP_200_OK)
    except Exception as e:
        print(str(e))
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['GET'])
# getUserOrder/
def getUserOrder(request):
    user_id = request.GET.get('user_id')
    order_status = request.GET.get('status')
    if(order_status=="ALL"):
        orders = User_Order.objects.filter(user_id=user_id)
    else:
        orders = User_Order.objects.filter(user_id=user_id, order_status=order_status)
    if not orders:
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        order_data = OrderSerializer(orders, many=True)
        reqData = {'orders': order_data.data}
        return Response(reqData, status=status.HTTP_200_OK)

@csrf_exempt
@api_view(['GET'])
def getSellerOrder(request):
    seller_id = request.GET.get('seller_id')
    order_status = request.GET.get('status')
    if(order_status=="ALL"):
        orders = Seller_Order.objects.filter(seller_id=seller_id)
    else:
        orders = Seller_Order.objects.filter(seller_id=seller_id, order_status=order_status)
    if not orders:
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        order_data = SellerOrderSerializer(orders, many=True)
        reqData = {'orders': order_data.data}
        return Response(reqData, status=status.HTTP_200_OK)
    
@csrf_exempt
@api_view(['GET'])
def getUserOrderItems(request):
    try:
        order_id = request.GET.get('order_id')
        order = get_object_or_404(User_Order, user_order_id=order_id)
        items = User_Order_item.objects.filter(user_order_id=order_id)
        if not items:
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            item_data = OrderItemSerializer(items, many=True)
            prod_ids = {'products': list(items.values_list('product_id', flat=True))}
            prodInfo = requests.post(f"{micro_services['PRODUCT']}/getproduct", json=prod_ids)
            if(prodInfo.status_code==200):
                prodInfo = prodInfo.json()
                for i in item_data.data:
                    for j in prodInfo["result"]:
                        if(i['product_id'] == j["_id"]):
                            i["name"] = j['newProduct']["name"]
                            i["product_price"] = j["newProduct"]["price"]
                            break
                reqData = {'items': item_data.data, 'total_value': order.total_value}
                return Response(reqData, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(str(e))
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@csrf_exempt
@api_view(['GET'])
def getSellerOrderItems(request):
    order_id = request.GET.get('order_id')
    order = get_object_or_404(Seller_Order, seller_order_id=order_id)
    items = Seller_Order_item.objects.filter(seller_order_id=order_id)
    if not items:
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        item_data = SellerOrderItemSerializer(items, many=True)
        prod_ids = items.values_list('product_id', flat=True)
        prodInfo = test_func(prod_ids)
        for i in item_data.data:
            i.update(prodInfo['data'][i['product_id']])
        reqData = {'items': item_data.data, 'total_value': order.total_value}
        return Response(reqData, status=status.HTTP_200_OK)
    
@csrf_exempt
@api_view(['DELETE'])
def cancelOrder(request):
    try:
        data = JSONParser().parse(request)
        order_id = data['order_id']
        pdf_path = f'./invoices/invoice_{order_id}.pdf'
        os.remove(pdf_path)
        user_order_items = User_Order_item.objects.filter(user_order_id=order_id)
        user_order_items.delete()
        user_order = get_object_or_404(User_Order, user_order_id=order_id)
        user_order.delete()
        seller_orders = Seller_Order.objects.filter(user_order_id=order_id)
        seller_items = Seller_Order_item.objects.filter(seller_order_id__in=seller_orders)
        seller_items.delete()
        seller_orders.delete()
        return Response({'message': 'Order Cancelled Successfully'}, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
