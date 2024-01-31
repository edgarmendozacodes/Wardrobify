from django.urls import path

from .api_views import api_list_shoes, api_delete_shoes

urlpatterns = [
    path("shoes/", api_list_shoes, name="api_list_shoes"),
    path("shoes/<int:id>/", api_delete_shoes, name="api_delete_shoes"),
]
