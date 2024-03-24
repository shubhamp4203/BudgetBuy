from django.urls import path
from inventory import views

urlpatterns = [
    path('addStock/', views.addStock),
    path('getInv/', views.getInventory),
    path('checkStock/', views.checkStock),
    path('updateStock/', views.updateStock),
    path('editStock/', views.editStock)
]