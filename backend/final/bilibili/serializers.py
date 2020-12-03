from rest_framework import serializers
from bilibili.models import BiliUser

class biliSerializer(serializers.ModelSerializer):
    class Meta:
        model = BiliUser
        fields = ('mid','name','sex','sign','level','viptype','following','fans')