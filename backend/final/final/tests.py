import unittest
from django.test import Client

class GetsexTest(unittest.TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_details(self):
        # Issue a GET request.
        response = self.client.get('/api/getsexnum/')
        print(response.data)
        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)

        # Check that the rendered context contains 5 customers.
        # self.assertEqual(len(response.context['customers']), 5)

class LoginTest(unittest.TestCase):
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_details(self):
        # Issue a GET request.
        response = self.client.post('/api/login/', {'username': 'sxz', 'password': 'sxz'},content_type="application/json")
        print(response.status_code)
        # Check that the response is 200 OK.
        # self.assertEqual(response.status_code, 200)
