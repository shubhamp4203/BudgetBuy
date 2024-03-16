from django.urls import path
from orders import views

urlpatterns = [
    path('addCart/', views.addCart),
    path('delCart/', views.delCart),
    path('getCart/', views.getCart),
    path('addOrder/', views.addOrder),
]