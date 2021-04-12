from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.utils import json

from store.serializers import BookSerializer

from store.models import Book, UserBookRelation


class BooksAPITestCase(APITestCase):
    def setUp(self):
        self.book_1 = Book.objects.create(name='test book1', price=25, author_name='Author1')
        self.book_2 = Book.objects.create(name='test book2', price=30, author_name='Author2')
        self.book_3 = Book.objects.create(name='test book3', price=50, author_name='Author3')

    def test_get(self):
        url = reverse('book-list')  # book-detail
        response = self.client.get(url)
        serializer_data = BookSerializer([self.book_1, self.book_2, self.book_3], many=True).data
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(serializer_data, response.data)

    def test_get_filter(self):
        url = reverse('book-list')  # book-detail
        response = self.client.get(url, data={'name': 'test book2'})
        serializer_data = BookSerializer([self.book_2], many=True).data
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(serializer_data, response.data)


class BooksRelationsAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username='test_username')
        self.user2 = User.objects.create(username='test_username2')

        self.book_1 = Book.objects.create(name='test book1', price=25, author_name='Author1')
        self.book_2 = Book.objects.create(name='test book2', price=30, author_name='Author2')

    def test_rate(self):
        url = reverse('userbookrelation-detail', args=(self.book_1.id,))  # book-detail  #  userbookrelation-detail

        data = {
            'rate': 1,
        }
        json_data = json.dumps(data)
        self.client.force_login(self.user)
        response = self.client.patch(url, data=json_data, content_type='application/json')
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        relation = UserBookRelation.objects.get(user=self.user, book=self.book_1)
        self.assertEqual(1, relation.rate)