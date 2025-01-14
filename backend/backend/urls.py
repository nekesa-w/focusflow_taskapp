from django.contrib import admin
from django.urls import path, include
from knox import views as knox_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("taskapp.urls")),
    path("api/", include("taskapp.urls")),
    path("logoutall/", knox_views.LogoutAllView.as_view(), name="knox_logoutall"),
]
