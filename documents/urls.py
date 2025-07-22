from django.urls import path

from documents.views import index

app_name = "documents"

urlpatterns = [
    path("", index, name="index"),
]
