from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from bilibili.models import BiliUser
from bilibili.serializers import biliSerializer
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage


@api_view(['GET', 'POST'])
def getnumberofsex(request, format=None):
   if request.method == 'GET':
       male_user = BiliUser.objects.filter(sex = '男')
       female_user = BiliUser.objects.filter(sex = '女')
       unknown_user = BiliUser.objects.filter(sex = '保密')
    #    print(len(alluser))
       return Response( {"male_number": len(male_user) ,"female_number":len(female_user),
                        "unknow_number": len(unknown_user)})

@api_view(['GET', 'POST'])
def getnumberoflevels(request, format=None):
   if request.method == 'GET':
       level_1 = BiliUser.objects.filter(level = '1')
       level_2 = BiliUser.objects.filter(level = '2')
       level_3 = BiliUser.objects.filter(level = '3')
       level_4 = BiliUser.objects.filter(level = '4')
       level_5 = BiliUser.objects.filter(level = '5')
       level_6 = BiliUser.objects.filter(level = '6')
       return Response( {"lv1_number": len(level_1),"lv2_number": len(level_2)  ,
       "lv3_number": len(level_3), "lv4_number": len(level_4) ,"lv5_number": len(level_5) ,"lv6_number": len(level_6) }  )

@api_view(['GET', 'POST'])
def mostfans(request, format=None):
   if request.method == 'GET':
       most_user = BiliUser.objects.all().order_by('-fans')[:10]
       serializer = biliSerializer(most_user, many=True)
       print(most_user)
       print(len(most_user))
       return Response( serializer.data  )

@api_view(['GET', 'POST'])
def search(request, format=None):
   if request.method == 'GET':
       keyword = request.GET.get('keyword')
       target_ = BiliUser.objects.filter(name__icontains=keyword)
       paginator = Paginator(target_, 10)
       page_num = request.GET.get('page', default='1')
       try:
          page = paginator.page(page_num)
       except PageNotAnInteger as e:
          page = paginator.page('1')
          page_num = 1
       except EmptyPage as e:
          print('EmptyPage:{}'.format(e))
          if int(page_num) > paginator.num_pages:
                page = paginator.page(paginator.num_pages)
          else:
                page = paginator.page(1)
       page_num = int(page_num)
       print(len(page.object_list))
       print(page)
       serializer = biliSerializer(page, many=True)
       return Response( {'page':serializer.data , 'total_pages_num': paginator.num_pages , 'page_object_num ': len(page.object_list) } )


