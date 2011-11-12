from django.conf.urls.defaults import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # App stuff.
    url(r'^$', include('app.urls')),

    # API stuff.
    url(r'^api/', include('api.urls')),

    # Admin.
    url(r'^admin/', include(admin.site.urls)),
)
