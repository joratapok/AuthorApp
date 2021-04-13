
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.filters import SearchFilter
from rest_framework.mixins import UpdateModelMixin, CreateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet, GenericViewSet, ViewSet
from store.serializers import BookSerializer, UserBookRelationSerializer, CommentsSerializer
from store.models import Book, UserBookRelation, Comments
from django.db.models import Avg


class BookViewSet(ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Book.objects.all().annotate(rated_books=Avg('userbookrelation__rate'))
    serializer_class = BookSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filter_fields = ['name', 'price']
    search_fields = ['name', 'author_name']
    ordering_fields = ['name']


class UserBookRelationView(UpdateModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    queryset = UserBookRelation.objects.all()
    serializer_class = UserBookRelationSerializer
    lookup_field = 'book'

    def get_object(self):
        obj, _ =UserBookRelation.objects.get_or_create(user=self.request.user,
                                                       book_id=self.kwargs['book'])
        return obj


class CommentsCreateView(UpdateModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer
    lookup_field = 'book'

    def get_object(self):
        obj, _ =Comments.objects.create(owner=self.request.user, book_id=self.kwargs['book'])
        return obj


class CommentsInBookView(generics.ListAPIView):
    serializer_class = CommentsSerializer

    def get_queryset(self):
        book = self.kwargs['book']
        return Comments.objects.filter(book__id=book)