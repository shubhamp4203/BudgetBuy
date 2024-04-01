from django.urls import path
from emailapp import views

urlpatterns = [
    path('sendOtp/', views.send_otp),
    path('verifyOtp/', views.verify_otp)
]