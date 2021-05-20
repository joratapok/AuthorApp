from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

from user_auth.views import RegisterView, GoogleLogin, AuthMe, ProfileDetailView

urlpatterns = [
    path('token-auth/', obtain_jwt_token),
    path('token-refresh/', refresh_jwt_token),
    path('token-verify/', verify_jwt_token),
    path('auth-me/', AuthMe.as_view()),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('auth/', include('rest_framework.urls')),
    path('google/', GoogleLogin.as_view(), ),
    path('accounts/', include('allauth.urls')),
    path('profile/<master>', ProfileDetailView.as_view()),
]
