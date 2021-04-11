from rest_framework.serializers import ModelSerializer
from store.models import Book


class BookSerializer(ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'name', 'poster') #'__all__'


class UserBookRelationSerializer(ModelSerializer):
    class Meta:
        model = Book
        fields = ('book', 'rate')