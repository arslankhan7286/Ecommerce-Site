from email import message
from math import fabs
from traceback import print_exc
from django.shortcuts import render

from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAdminUser ,IsAuthenticated
from rest_framework.response import Response


from django.contrib.auth.models import User
from base.serializer import ProductSerializer ,UserSerializer , userSerializerWithTokern
from base.models import Product , Review
from django.contrib.auth.hashers import make_password
from django.core.paginator import PageNotAnInteger, Paginator,EmptyPage

# Create your views here.
from rest_framework import status



@api_view(['Get'])
def gerProducts(request):

    query =request.query_params.get('keyword')
    

    if query ==None:
        query=""

    products = Product.objects.filter(name__icontains=query)

    page = request.query_params.get('page')
    paginator = Paginator(products,3)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page ==None:
        page = 1

    page = int(page)

    seriali = ProductSerializer(products , many=True)


    return Response({"products":seriali.data , 'page':page , 'pages':paginator.num_pages})



@api_view(['Get'])
def gerProduct( request , pk):
   
    product = Product.objects.get(id = pk)
    serialize = ProductSerializer(product , many=False)

    return Response(serialize.data)





@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct( request):
   
    user = request.user
    product = Product.objects.create(
        user = user,
        name = 'Sample Name',
        brand = 'Sample Brand',
        price = 0,
        countInstock =0,
        category = 'Sample Category',
        description = ''
    )
    serialize = ProductSerializer(product , many=False)

    return Response(serialize.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct( request , pk):
    

    data = request.data
    product = Product.objects.get(id = pk)
    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInstock = data['countInStock']
    product.category = data['category']
    product.description = data['description']
    product.save()
    serialize = ProductSerializer(product , many=False)

    return Response(serialize.data)




@api_view(['DELETE'])
@permission_classes([IsAdminUser])

def deleteProduct( request , pk):
   
    product = Product.objects.get(id = pk)
    product.delete()

    return Response('product has been deleted')


@api_view(['POST'])
def uploadImage(request):
    data = request.data 

   
    productId = data['product_id']
  
    product = Product.objects.get(id = productId)
 
    product.image = request.FILES.get('image')
    print( product.image,"product imagessss")
    product.save()
    return Response("Image was uploaded")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def productReview(request , pk):

    user = request.user
    data = request.data
    print(type(pk), "pkkk")
    print(data,"dataa")

    product = Product.objects.get(id = pk)
    
    alreadyExists = product.review_set.filter(user= user).exists()
    

    if alreadyExists:
        content ={'detail':'review already exists'}

        return Response(content , status=status.HTTP_400_BAD_REQUEST)

    elif  data['rating'] ==0:
        content = {'detail':'product is already reviewd'}

        return Response(content , status=status.HTTP_400_BAD_REQUEST)

    else:
        
        review = Review.objects.create(

            user = user,
            product = product,
            name = user.first_name,
            rating = data['rating'],
            comment = data['comment']
        )

        reviews = product.review_set.all()

        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)

        product.save()

        return Response("Review Added")