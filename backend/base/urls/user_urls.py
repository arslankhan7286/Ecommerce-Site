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

from unicodedata import name
from django.urls import path
from base.views import user_views as views





urlpatterns = [
     path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    

     path('register' , views.registerUSer , name="register"),
      
     path('' , views.gerUsers , name="users"),
     path('profile' , views.gerUserProfile , name="user-profile"),
      path('profile/update/' , views.updateUserProfile , name="user-profile-update"),


      path('<str:pk>' , views.getUserbyId , name='user'),
      
      path('update/<str:pk>' , views.updateUserById , name='user-update'),
      path('delete/<str:pk>' , views.deleteUser , name = 'Delete-user')
  
]
