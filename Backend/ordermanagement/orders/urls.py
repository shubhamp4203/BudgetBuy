from django.urls import path
from orders import views

urlpatterns = [
    path('addCart/', views.addCart),
    path('delCart/', views.delCart),
    path('getCart/', views.getCart),
    path('addOrder/', views.addOrder),
    path('getUserOrder/', views.getUserOrder),
    path('getUserOrderItem/', views.getUserOrderItems),
    path('getSellerOrder/', views.getSellerOrder),
    path('getSellerOrderItem/', views.getSellerOrderItems),
    path('createCart/', views.createCart),
    path('editOrder/', views.editOrderStatus),
]