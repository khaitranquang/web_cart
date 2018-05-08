from django.conf.urls import url
from django.views.generic import RedirectView
from django.contrib.staticfiles.views import serve

from .views import BookListView, BookDetailView, OrderListView, OrderDetailView

urlpatterns = [
    url(r'^$', serve,kwargs={'path': 'index.html'}),    
    url(r'^(?!/?static/)(?!/?media/)(?P<path>.*\..*)$',
    RedirectView.as_view(url='/static/%(path)s', permanent=False)),

    url(r'^books/?$', BookListView.as_view()),
    url(r'^books/(?P<pk>[0-9]+)/$', BookDetailView.as_view()),
    url(r'^orders/?$', OrderListView.as_view({'get': 'list', 'post': 'create'})),
    url(r'^orders/(?P<pk>[0-9]+)/$', OrderDetailView.as_view()),
]