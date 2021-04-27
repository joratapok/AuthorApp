import requests
from django.shortcuts import redirect
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.filters import SearchFilter
from rest_framework.mixins import UpdateModelMixin
from rest_framework.permissions import IsAuthenticated, AllowAny
from .permissions import IsOwnerProfileOrReadOnly
from rest_framework.views import APIView
from rest_framework.viewsets import ReadOnlyModelViewSet, GenericViewSet
from store.serializers import BookSerializer, UserBookRelationSerializer, CommentsSerializer, AllBooksSerializer, ProfileSerializer, ChaptersSerializer
from store.models import Book, UserBookRelation, Comments, Profile, Chapters
from django.db.models import Avg
from rest_framework.pagination import PageNumberPagination



class BookViewSet(ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    queryset = Book.objects.all().annotate(rated_books=Avg('userbookrelation__rate'))
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filter_fields = ['name', 'genre__name']
    search_fields = ['name']

    def get_serializer_class(self):
        if self.action == 'list':
            return AllBooksSerializer
        if self.action == 'retrieve':
            return BookSerializer
        return BookSerializer


class ChapterPagination(PageNumberPagination):
   page_size = 1

class ChaptersViewSet(generics.ListAPIView):
    serializer_class = ChaptersSerializer
    permission_classes = [AllowAny]
    pagination_class = ChapterPagination
    lookup_field = 'book'

    def get_queryset(self):
        return Chapters.objects.filter(book__id=self.kwargs['book'])
    


class UserBookRelationView(UpdateModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    queryset = UserBookRelation.objects.all()
    serializer_class = UserBookRelationSerializer
    lookup_field = 'book'

    def get_object(self):
        obj, _ = UserBookRelation.objects.get_or_create(user=self.request.user,
                                                        book_id=self.kwargs['book'])
        return obj


class CommentsCreateView(UpdateModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer
    lookup_field = 'book'

    def get_object(self):
        text = self.request.data['text']
        obj, _ = Comments.objects.get_or_create(owner=self.request.user,
                                                book_id=self.kwargs['book'], text=text)
        return obj


class CommentsInBookView(generics.ListAPIView):
    serializer_class = CommentsSerializer

    def get_queryset(self):
        return Comments.objects.filter(book__id=self.kwargs['book']).order_by('-id')


class UserActivationView(APIView):
    permission_classes = [AllowAny]

    def get (self, request, uid, token):
        protocol = 'https://' if request.is_secure() else 'http://'
        web_url = protocol + request.get_host()
        post_url = web_url + "/auth/users/activation/"
        post_data = {'uid': uid, 'token': token}
        requests.post(post_url, data = post_data)
        return redirect('http://localhost:3000/login')


class ProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsOwnerProfileOrReadOnly]
    lookup_field = 'master'

    def get_object(self):
        obj, _ = Profile.objects.get_or_create(master_id=self.kwargs['master'])
        return obj