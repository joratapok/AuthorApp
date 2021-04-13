from unittest import TestCase
from django.db.models import Avg
from store.models import Book
from store.serializers import BookSerializer


class BookSerializerCase(TestCase):
    def test_ok(self):
        book_1 = Book.objects.create(name='test book1', price=25, author_name='Author1')
        book_2 = Book.objects.create(name='test book2', price=30, author_name='Author2')

        user1 = User.objects.create(username='test_username1')
        user2 = User.objects.create(username='test_username2')

        UserBookRelation.objects.create(user=user1, book=book_1, rate=3)
        UserBookRelation.objects.create(user=user2, book=book_1, rate=5)

        books = Book.objects.all().annotate(
            rated_books=Avg('userbookrelation__rate')
            ).order_by('id')

        data = BookSerializer(books, many=True).data
        expected_data = [
            {
                'id': book_1.id,
                'name': 'test book1',
                'poster': None,
                'rating': 0
                
            },
            {
                'id': book_2.id,
                'name': 'test book2',
                'poster': None,
                'rating': 0
                
            },
        ]
        print(f'expected_data: -- {expected_data}; DATA -- {data}')
        self.assertEqual(data, expected_data)