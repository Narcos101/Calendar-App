from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('',views.getRoutes),
    path(r'token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path(r'token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]   