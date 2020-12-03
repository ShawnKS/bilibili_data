from django.db import models

# Create your models here.
class UserInfo(models.Model):
    username = models.CharField(max_length=30, blank=True, null=True)
    password = models.CharField(max_length=30, blank=True, null=True)
    gender = models.IntegerField(blank=True, null=True)
    sign = models.CharField(max_length=80, blank=True, null=True)
    name = models.CharField(max_length=10, blank=True, null=True)
    email = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_info'