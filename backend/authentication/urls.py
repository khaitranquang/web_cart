from django.conf.urls import url
from django.views.generic import RedirectView
from django.contrib.staticfiles.views import serve

from .views import RegistrationAPIView, LoginAPIView, UserRetrieveUpdateAPIView, LogoutView

urlpatterns = [
    # url(r'^$', serve,kwargs={'path': 'index.html'}),    
    # url(r'^(?!/?static/)(?!/?media/)(?P<path>.*\..*)$',
    # RedirectView.as_view(url='/static/%(path)s', permanent=False)),

    url(r'^users/register/?$', RegistrationAPIView.as_view()),
    url(r'^users/login/?$', LoginAPIView.as_view()),
    url(r'^users/logout/?$', LogoutView.as_view()),
    url(r'^users/?$', UserRetrieveUpdateAPIView.as_view()),
]