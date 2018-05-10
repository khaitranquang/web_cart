from django.conf.urls import url
from django.views.generic import RedirectView
from django.contrib.staticfiles.views import serve


urlpatterns = [
    url(r'^$', serve,kwargs={'path': 'index.html'}),    
    # url('/', serve,kwargs={'path': 'index.html'}),    
    url(r'^(?!/?static/)(?!/?media/)(?P<path>.*\..*)$',
    RedirectView.as_view(url='/static/%(path)s', permanent=False)),
]