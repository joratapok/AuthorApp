from rest_framework import serializers
from store.models import Book, UserBookRelation, Comments


class BookSerializer(serializers.ModelSerializer):
    rated_books = serializers.DecimalField(max_digits=3, decimal_places=2, read_only=True)

    class Meta:
        model = Book
        fields = ('id', 'name', 'poster', 'rated_books') #'__all__'



class UserBookRelationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBookRelation
        fields = ('book', 'rate')


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ('text', 'owner', 'book')
