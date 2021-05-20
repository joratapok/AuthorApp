from django.urls import path, re_path
from rest_framework.routers import SimpleRouter
from books.views import ChaptersViewSet, CommentsInBookView, BookViewSet, UserBookRelationView, CommentsCreateView

router = SimpleRouter()

router.register(r'', BookViewSet)
router.register(r'book_relation', UserBookRelationView)
router.register(r'add_comments', CommentsCreateView)

urlpatterns = [
    path('chapters/<book>', ChaptersViewSet.as_view()),
    re_path('^comments/(?P<book>.+)/$', CommentsInBookView.as_view()),
]

urlpatterns += router.urls