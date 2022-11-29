from email import message
from math import fabs
from traceback import print_exc
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAdminUser ,IsAuthenticated
from rest_framework.response import Response


from django.contrib.auth.models import User
from base.serializer import ProductSerializer ,UserSerializer , userSerializerWithTokern
from django.contrib.auth.hashers import make_password

# Create your views here.
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
     def validate(self, attrs):
        data = super().validate(attrs)

        serializer = userSerializerWithTokern(self.user).data
        print(serializer,"serializer")

        for k,v in serializer.items():
            data[k]= v


        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    print(serializer_class,"dataaa")



def getRoutes(request):
    return JsonResponse("hello worlds" , safe=False)


#REGISTERUSER


@api_view(['POST'])

def registerUSer(request):

   data = request.data

 
   try:
        user = User.objects.create(
            first_name = data['name'],

            username = data['username'],
            email = data['username'],

            password = make_password(data['password'])
            )
       

        serializerr = userSerializerWithTokern(user , many=False)

        return Response(serializerr.data)

   except:
        message ={'details':"user information is already saved"}

        return Response(message,status=status.HTTP_400_BAD_REQUEST)
   





@api_view(['Get'])
@permission_classes([IsAuthenticated])
def gerUserProfile(request):
    user = request.user

    seriali = UserSerializer(user , many=False)

    return Response(seriali.data)

# /*update user Profile */
@api_view(['put'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    
    
    seriali = userSerializerWithTokern(user , many=False)

    data = request.data  
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password =  make_password(data['password'])

    user.save()
    

    return Response(seriali.data)


# /*get users  */
@api_view(['Get'])
@permission_classes([IsAdminUser])
def gerUsers(request):

    users = User.objects.all()
    seriali = UserSerializer(users , many=True)

    return Response(seriali.data)





# /*update user  */
@api_view(['put'])
@permission_classes([IsAuthenticated])
def updateUserById(request , pk):
    user = User.objects.get(id=pk)
    
    
 

    data = request.data  
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff  = data['isAdmin']
   
   

    user.save()
    seriali = UserSerializer(user , many=False)
    

    return Response(seriali.data)





# //get User By id
@api_view(['Get'])
@permission_classes([IsAdminUser])
def getUserbyId(request , pk):

    user = User.objects.get(id = pk)
    seriali = UserSerializer(user , many=False)

    return Response(seriali.data)











# /*DELETE USER  */
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request , pk):
    
    deleteUser = User.objects.get(id = pk)
    deleteUser.delete()
    

    return Response("User was deleted")
