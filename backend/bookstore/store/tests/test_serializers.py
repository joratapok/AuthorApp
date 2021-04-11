from unittest import TestCase

from store.models import Book

from store.serializers import BookSerializer


class BookSerializerCase(TestCase):
    def test_ok(self):
        book_1 = Book.objects.create(name='test book1', price=25, author_name='Author1')
        book_2 = Book.objects.create(name='test book2', price=30, author_name='Author2')
        data = BookSerializer([book_1, book_2], many=True).data
        expected_data = [
            {
                'id': book_1.id,
                'name': 'test book1',
                'price': '25.00',
                'author_name': 'Author1'
            },
            {
                'id': book_2.id,
                'name': 'test book2',
                'price': '30.00',
                'author_name': 'Author2'
            },
        ]
        print(f'expected_data: -- {expected_data}')
        self.assertEqual(data, expected_data)