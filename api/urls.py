from django.conf.urls.defaults import patterns, url
from views import *

urlpatterns = patterns('api.views',
    url(r'^comments/?$', Comments.as_view(), name="comments"),
    url(r'^comments/(?P<comment_id>\d+)/?$', Comment.as_view(), name="comment"),
    url(r'^comments/(?P<comment_id>\d+)/rate/?$', CommentRating.as_view(), name="comment-ratings"),
)
