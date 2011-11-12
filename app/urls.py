from django.conf.urls.defaults import patterns, url

urlpatterns = patterns('app.views',
    url(r'^$', 'home', name="home"),
)
