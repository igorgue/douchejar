from django.conf.urls.defaults import patterns, url

urlpatterns = patterns('app.views',
    url(r'^comments/(?P<comment_id>\d+)/?$', 'comment', name="comment"),
    url(r'^$', 'home', name="home"),
)
