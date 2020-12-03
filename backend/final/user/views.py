from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.utils import jwt_decode_handler

from user.models import UserInfo
from user.serializers import UserSerializer
import time
import json

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

@api_view(['GET', 'POST'])
def getlist(request, format=None):
   if request.method == 'GET':
       users = UserInfo.objects.all()
       serializer = UserSerializer(users, many=True)
       return Response(serializer.data)

   elif request.method == 'POST':
       print(request.GET.get('test'))

       return Response({"message": "Got some data!", "data": request.GET.get('test')})
       
       serializer = UserSerializer(data=request.data)
       if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED)
       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def getuserinfo(request, format=None):
   if request.method == 'GET':
       token = request.META.get("HTTP_TOKEN")
       print(token)
    #    print(jwt_decode_handler(token))
       user_decode = jwt_decode_handler(token)
       username = user_decode['username']
    #    exp = user_decode['exp']
    #    print(exp)
    #    print(username)
    #    print(time.time())
       users = UserInfo.objects.filter(username=username)
    #    print(users)
       serializer = UserSerializer(users, many=True)
       return Response(serializer.data[0])

@api_view(['GET', 'POST'])
def setuserinfo(request, format=None):
   if request.method == 'GET':
       return Response(status=status.HTTP_400_BAD_REQUEST)

   elif request.method == 'POST':
       get_json = json.loads(request.body)
       token = request.META.get("HTTP_TOKEN")
       user_decode = jwt_decode_handler(token)
       username = user_decode['username']
       try:
           gender = int(get_json['gender'])
       except:
           gender = None
       try:
           sign = get_json['sign']
       except:
           sign = None
       try:
           name = get_json['name']
       except:
           name = None
       try:
           email = get_json['email']
       except:
           email = None

       try:
           UserInfo.objects.filter(username = username).update(name = name, sign = sign, gender = gender , email = email)
           return Response({"msg":"changed"}, status=status.HTTP_200_OK)
       except:
           return Response(status = status.HTTP_400_BAD_REQUEST)

#    elif request.method == 'POST':
#        print(request.GET.get('test'))

#        return Response({"message": "Got some data!", "data": request.GET.get('test')})
       
#        serializer = UserSerializer(data=request.data)
#        if serializer.is_valid():
#            serializer.save()
#            return Response(serializer.data, status=status.HTTP_201_CREATED)
#        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)