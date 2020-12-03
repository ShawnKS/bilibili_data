import os,sys,django
# import rest_framework
sys.path.append("F:/CS/reptile-adventure/backend/final/final")
import settings
os.environ["DJANGO_SETTINGS_MODULE"]="settings"#Attention!Err: 'no handlers could be found for logger "django.request"'
 
django.setup()#ATTETION!,raise django.core.exceptions.ImproperlyConfigured
 
from django.test.utils import setup_test_environment
 
from django.test.client import Client
 
# from django.core.urlresolvers import reverse
 
setup_test_environment()
 
# client = Client()
 
# response = client.get('/')

# from django.test import Client
c = Client()
response = c.post('/login/', {'username': 'john', 'password': 'smith'})
print(response.status_code)