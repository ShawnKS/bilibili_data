from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings
from django.http import JsonResponse

from user.models import UserInfo
from user.serializers import UserSerializer
import hashlib,time
import json

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
# def md5(user):
#     ctime = str(time.time())
#     m = hashlib.md5(bytes(user,encoding='utf-8'))
#     m.update(bytes(ctime,encoding='utf-8'))
#     return m.hexdigest()

@api_view(['GET', 'POST'])
def getlist(request, format=None):
   if request.method == 'GET':
       token = request.META.get("HTTP_TOKEN")
       print(token)
       print(jwt_decode_handler(token))
    #    print(json.load('exp'))
    #    get判断header的信息对不对
       print(int(time.time()))
       users = UserInfo.objects.all()
       serializer = UserSerializer(users, many=True)
       return Response(serializer.data)

   elif request.method == 'POST':
    #    post判断登录注册操作
       print("the POST method")
       print(request.body)
       print(json.loads(request.body))
       get_json = json.loads(request.body)
       username = get_json['username']
       password = get_json['password']
       user = UserInfo.objects.filter(username=username,password=password).first()
       if not user:
           return Response({"msg":"error"},status=status.HTTP_400_BAD_REQUEST)
       else:
           print(user)
           payload = jwt_payload_handler(user)
           token = jwt_encode_handler(payload)
           print(jwt_decode_handler(token))
           print(token)
           return Response({"token":token},status=status.HTTP_200_OK)
                #   print(request.GET.get('test'))


       return Response({"message":"POST!"})
       
       serializer = UserSerializer(data=request.data)
       if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED)
       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# class UserAPI(APIView):
#     #用户登录类
#     def post(self,request,*args,**kwargs):
#         ret = {'code': 200, 'msg': None}
#         try:
#         #取前台数据
#             user = request._request.POST.get('username')
#             pwd = request._request.POST.get('password')
#         #验证数据
#             obj = UserInfo.objects.filter(username=user,password=pwd).first()
#             if not obj:
#                 ret['code']= 201
#                 ret['msg'] = '用户名或密码错误'    
#             else:
#                 ret['msg'] = '用户名或密码错误'  
#             #     #为登录用户创建TOKEN
#             #     token = md5(user)
#             #     #存在就更新，不存在就创建,token表user对应的是userinfo表，这里user=obj
#             #     UserToken.objects.update_or_create(user=obj,defaults={'token':token})
#             #     ret['token'] = token
#         except Exception as e:
#             ret['code'] = 1001
#             ret['msg'] = '请求异常'
#         return JsonResponse(ret)