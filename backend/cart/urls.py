from django.conf.urls import url
from django.views.generic import RedirectView
from django.contrib.staticfiles.views import serve

from .views import BookListView, BookDetailView, OrderListView, OrderDetailView

urlpatterns = [
    # url(r'^$', serve,kwargs={'path': 'index.html'}),    
    # url(r'^(?!/?static/)(?!/?media/)(?P<path>.*\..*)$',
    # RedirectView.as_view(url='/static/%(path)s', permanent=True)),

    url(r'^api/v1/books/?$', BookListView.as_view()),
    url(r'^api/v1/books/(?P<pk>[0-9]+)/$', BookDetailView.as_view()),
    url(r'^api/v1/orders/?$', OrderListView.as_view({'get': 'list', 'post': 'create'})),
    url(r'^api/v1/orders/(?P<pk>[0-9]+)$', OrderDetailView.as_view()),
]