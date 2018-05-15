from django.conf.urls import url
from django.views.generic import RedirectView
from django.contrib.staticfiles.views import serve

from .views import (BookListView, BookDetailView, OrderListView, OrderDetailView, 
                    RegistrationAPIView, LoginAPIView, UserRetrieveUpdateAPIView, LogoutView)

urlpatterns = [
    url(r'^auth/users/register/?$', RegistrationAPIView.as_view()),
    url(r'^auth/users/login/?$', LoginAPIView.as_view()),
    url(r'^auth/users/logout/?$', LogoutView.as_view()),
    url(r'^auth/users/?$', UserRetrieveUpdateAPIView.as_view()),


    url(r'^books/?$', BookListView.as_view()),
    url(r'^books/(?P<pk>[0-9]+)$', BookDetailView.as_view()),
    url(r'^orders/?$', OrderListView.as_view({'get': 'list', 'post': 'create'})),
    url(r'^orders/(?P<pk>[0-9]+)$', OrderDetailView.as_view()),
]