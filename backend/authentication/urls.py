from django.conf.urls import url

from .views import RegistrationAPIView, LoginAPIView, UserRetrieveUpdateAPIView, LogoutView

urlpatterns = [
    url(r'^users/register/?$', RegistrationAPIView.as_view()),
    url(r'^users/login/?$', LoginAPIView.as_view()),
    url(r'^users/logout/?$', LogoutView.as_view()),
    url(r'^users/?$', UserRetrieveUpdateAPIView.as_view()),
]