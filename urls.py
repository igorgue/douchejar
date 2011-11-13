from django.conf.urls.defaults import patterns, include, url
from django.contrib import admin

from app import models

admin.site.register(models.Comment)
admin.site.register(models.Rating)
admin.site.register(models.Organization)

admin.autodiscover()

urlpatterns = patterns('',
    # API stuff.
    url(r'^api/', include('api.urls')),

    # Admin.
    url(r'^admin/?', include(admin.site.urls)),

    # App stuff.
    url(r'', include('app.urls')),
)
