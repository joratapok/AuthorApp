from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.mixins import UpdateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet, GenericViewSet
from store.serializers import BookSerializer, UserBookRelationSerializer
from store.models import Book, UserBookRelation


class BookViewSet(ReadOnlyModelViewSet):
    queryset = Book.objects.all()
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
        obj, _ =UserBookRelation.objects.get_or_create(user = self.request.user,
                                                       book_id=self.kwargs['book'])
        return obj