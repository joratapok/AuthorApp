from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import SimpleRouter


router = SimpleRouter()

urlpatterns = [
    path('api/', include('user_auth.urls')),
    path('api/books/', include('books.urls')),
    path('api/admin/', admin.site.urls),
]

urlpatterns += router.urls