from django.conf.urls.defaults import patterns, url

urlpatterns = patterns('app.views',
    url(r'^comments/(?P<comment_id>\d+)/?$', 'comment', name="comment"),
    url(r'^$', 'home', name="home"),
)

urlpatterns += patterns('',
    url(r'^logout/?$', 'django.contrib.auth.views.logout', { 'next_page': '/' }, name='logout'),
)
