from django.conf.urls.defaults import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'douchejar.views.home', name='home'),
    # url(r'^douchejar/', include('douchejar.foo.urls')),

    # Admin
    url(r'^admin/', include(admin.site.urls)),
)
