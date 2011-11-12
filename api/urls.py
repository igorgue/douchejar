from django.conf.urls.defaults import patterns, url
from views import *

urlpatterns = patterns('api.views',
    url(r'^comment/?$', Comments.as_view(), name="comments"),
    url(r'^comment/(?P<comment_id>\d+)/?$', Comment.as_view(), name="comment"),
    url(r'^comment/(?P<comment_id>\d+)/rate/?$', Comment.as_view(), name="comment-ratings"),
)
