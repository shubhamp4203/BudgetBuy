from django.urls import path
from emailapp import views

urlpatterns = [
    path('sendOtp/', views.send_otp),
    path('verifyOtp/', views.verify_otp),
    path('resetlink/', views.reset_link),
    path('userOrderMail/', views.user_order_mail)
]