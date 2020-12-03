from rest_framework import serializers
from user.models import UserInfo


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ('username','gender','name','sign','email')