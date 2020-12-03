from django.db import models

# Create your models here.
class BiliUser(models.Model):
    mid = models.IntegerField()
    name = models.CharField(max_length=255)
    sex = models.CharField(max_length=255)
    face = models.CharField(max_length=255)
    birthday = models.CharField(max_length=255)
    sign = models.CharField(max_length=255)
    level = models.CharField(max_length=255)
    viptype = models.CharField(db_column='vipType', max_length=255)  # Field name made lowercase.
    vipstatus = models.CharField(db_column='vipStatus', max_length=255)  # Field name made lowercase.
    toutu = models.CharField(max_length=255)
    toutuid = models.IntegerField(db_column='toutuId')  # Field name made lowercase.
    following = models.IntegerField()
    fans = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'bili_user'