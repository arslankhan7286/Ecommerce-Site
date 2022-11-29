"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from base.views import order_views as views





urlpatterns = [

    
      path('' , views.getOrders , name="orders"),
    path('add' , views.orderItems , name="order-item"),
      path('myorders' , views.getMyOrders , name="my-orders"),
 path('<str:pk>/deliver/' , views.updateOrderToDelivered , name='deliver-order'),
    path('<str:pk>' , views.getOrderbyId , name='user-order'),
    path('<str:pk>/pay' , views.updateOrderToPaid , name='pay')

    
    

]
