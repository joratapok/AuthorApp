from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from bookstore import settings
from store.views import BookViewSet, UserBookRelationView, CommentsInBookView, CommentsCreateView, UserActivationView, \
    ProfileDetailView, ChaptersViewSet, GoogleLogin, RegisterView

router = SimpleRouter()

router.register(r'book', BookViewSet)
router.register(r'book_relation', UserBookRelationView)
router.register(r'add_comments', CommentsCreateView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('activate/<str:uid>/<str:token>/', UserActivationView.as_view()),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    path('oauth', include('social_django.urls',)),
    path('api-google/', GoogleLogin.as_view(), ),
    path('profile/<master>', ProfileDetailView.as_view()),
    path('chapters/<book>', ChaptersViewSet.as_view()),
    re_path('^comments/(?P<book>.+)/$', CommentsInBookView.as_view()),
    path('api-token-auth/', obtain_jwt_token),
    path('api-token-refresh/', refresh_jwt_token),
    path('api-token-verify/', verify_jwt_token),
    path('register/', RegisterView.as_view(), name='auth_register'),
]

urlpatterns += router.urls
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
