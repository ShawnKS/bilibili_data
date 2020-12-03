"""final URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
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
from django.contrib import admin
from django.urls import path
from user import views as user_views
from login import views as login_views
from regist import views as regist_views
from bilibili import views as bili_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/alluser/', user_views.getlist),
    path('api/login/', login_views.getlist),
    path('api/regist/', regist_views.getlist),
    path('api/getsexnum/',bili_views.getnumberofsex),
    path('api/getlevelnum/',bili_views.getnumberoflevels),
    path('api/getmostfans/',bili_views.mostfans),
    path('api/getuserinfo/',user_views.getuserinfo),
    path('api/setuserinfo/',user_views.setuserinfo),
    path('api/search/',bili_views.search),
    # path('login/',login_views.UserAPI.post),
]
