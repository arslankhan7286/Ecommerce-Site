
from xmlrpc.client import DateTime
from django.shortcuts import render

from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAdminUser ,IsAuthenticated
from rest_framework.response import Response



from django.contrib.auth.models import User
from base.serializer import ProductSerializer ,UserSerializer , userSerializerWithTokern ,OrderSerializer
from base.models import Product, orderItem ,Order,shippingAddress
from django.contrib.auth.hashers import make_password

# Create your views here.
from rest_framework import status

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def orderItems (request):

    user = request.user
    data= request.data  

    orderItems = data['orderItems']
    if orderItems and len(orderItems) == 0:
        return Response({"details": "Don't have any order"} , status=status.HTTP_400_BAD_REQUEST)

    else:
      #create Order

      order = Order.objects.create(
        user =user,
         paymentMethod = data['paymentMethod'],
         taxPrice = data['taxPrice'],
         shippingPrice = data['shippingPrice'],
         totalPrice = data['totalPrice']

      )

      #shipping 

      shipping = shippingAddress.objects.create(
        order = order,
        address = data['shippingAddress']['Address'],
        city = data['shippingAddress']['City'],
        postalCode = data['shippingAddress']['PostalCode'],
        country = data['shippingAddress']['Country'] ,
      )

      #create Order

      for i in orderItems:

        print(i['product'],"IDDD")
        product = Product.objects.get(id=i['product'])

        item = orderItem.objects.create(

            product = product,
            order = order,
            name = product.name,
            qty = i['qty'],
            price = i['price'],
            image = product.image.url
            )

        
        product.countInstock -= item.qty 
       

        product.save()    

      serializer = OrderSerializer(order , many=False)

      return Response(serializer.data)





@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
  user = request.user
  orders = user.order_set.all()

  serializer = OrderSerializer(orders , many=True)
  return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getOrderbyId(request , pk):

      use = request.user
    
      
      try:
          Ord = Order.objects.get(id =pk) 

          
          if use.is_staff or Ord.user == use:
          
            
            serializer = OrderSerializer(Ord , many=False)

            return Response(serializer.data)

          else:
            return Response({"details":"User is not authenticated"} , status=status.HTTP_400_BAD_REQUEST)
      except:
          return Response({"details":"Order is epty"} , status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def updateOrderToPaid(request , pk):
  order = Order.objects.get(id=pk)
  order.isPaid = True
  order.PaidAt = DateTime.now()

  order.save()
  return Response("your order has been paid")

@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request , pk):
  order = Order.objects.get(id=pk)
  order.isDelivered = True
  order.deliveredAt = DateTime.now()

  order.save()
  return Response("your order has been delivered")




  
@api_view(["GET"])
@permission_classes([IsAdminUser])
def getOrders(request):
  
  orders = Order.objects.all()

  serializer = OrderSerializer(orders , many=True)
  return Response(serializer.data)
