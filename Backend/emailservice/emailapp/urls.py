from django.urls import path
from emailapp import views

urlpatterns = [
    path('sendotp/', views.send_otp),
    path('verifyotp/', views.verify_otp),
    path('resetlink/', views.reset_link),
    path('userOrderMail/', views.user_order_mail),
    path('sellerOrderMail/', views.seller_order_mail)
]

