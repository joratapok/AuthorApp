from rest_framework.serializers import ModelSerializer
from store.models import Book, UserBookRelation, Comments


class BookSerializer(ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'name', 'poster') #'__all__'


class UserBookRelationSerializer(ModelSerializer):
    class Meta:
        model = UserBookRelation
        fields = ('book', 'rate')


class CommentsSerializer(ModelSerializer):
    class Meta:
        model = Comments
        fields = ('text', 'owner')
