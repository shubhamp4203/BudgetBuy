from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from emailservice.settings import EMAIL_HOST_USER
from django.template.loader import render_to_string
from django.core.mail import send_mail, BadHeaderError
from rest_framework.response import Response
from rest_framework import status
import random
import requests
from emailapp.models import UserOtp
from emailservice.settings import micro_services
from asgiref.sync import async_to_sync
import asyncio


@csrf_exempt
@api_view(['POST'])
def send_otp(request):
    try:
        data = JSONParser().parse(request)
        order_id = data['order_id']
        seller_id  = data['seller_id']
        user_email = data['email']
        otp = random.randint(100000, 999999)
        user = UserOtp.objects.get_or_create(email=user_email)[0]
        user.otp = otp
        admin_email = EMAIL_HOST_USER
        subject = "Confirm Delivery OTP"
        c = {
            'user_otp': otp,
        }
        emailrender = render_to_string('email.txt', c)
        try:
            send_mail(subject, emailrender, admin_email , [user_email], fail_silently=False)
            user.save()
            res = {
                'message': 'OTP sent successfully',
                'order_id': order_id,
                'seller_id': seller_id
            }
            return Response(res, status=status.HTTP_200_OK)
        except BadHeaderError:
            return Response({'error': 'Invalid header found.'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
def verify_otp(request):
    try:
        data = JSONParser().parse(request)
        user_email = data['email']
        otp = data['otp']
        seller_id = data['seller_id']
        order_id = data['order_id']
        user = get_object_or_404(UserOtp, email=user_email)
        if user.otp == otp:
            delivered_success = requests.post(f'{micro_services["order"]}/delivered/', json={'order_id': order_id, 'seller_id': seller_id})
            if delivered_success.status_code == 200:
                return Response({'message': 'OTP verified successfully'}, status=200)
            else:
                print(delivered_success.json())
                return Response({'error': 'Something Went Wrong'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@csrf_exempt
@api_view(['POST'])
def reset_link(request):
    try:
        data = JSONParser().parse(request)
        resetlink = data['resetlink']
        email = data['email']
        admin_email = EMAIL_HOST_USER
        subject = "Reset Password Link"
        c = {
            "resetlink": resetlink,
        }
        emailrender = render_to_string('resetlink.txt', c)
        try:
            send_mail(subject, emailrender, admin_email, [email], fail_silently=False)
            return Response({'message': 'Reset Link sent successfully'}, status=status.HTTP_200_OK)
        except BadHeaderError:
            return Response({'error': 'Invalid header found.'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
def user_order_mail(request):
    try:
        data = JSONParser().parse(request)
        user_email = data['user_email']
        admin_email = EMAIL_HOST_USER
        subject = "Order Placed Successfully"
        body = "Your order has been placed successfully. You will receive a confirmation email shortly."
        try:
            send_mail(subject, body, admin_email, [user_email], fail_silently=False)
            return Response({'message': 'Order Placed Successfully'}, status=status.HTTP_200_OK)
        except BadHeaderError:
            return Response({'error': 'Invalid header found.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(str(e))
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)