from django.urls import path, include
from .views import ListApiView

urlpatterns = [
    path('blah', ListApiView.as_view()),
]