from django.conf.urls.defaults import patterns, url
from views import *

urlpatterns = patterns('api.views',
    url(r'^comments/?$', Comments.as_view(), name="comments"),
    url(r'^comments/(?P<comment_id>\d+)/?$', Comment.as_view(), name="comment"),
    url(r'^comments/(?P<comment_id>\d+)/rate/?$', CommentRating.as_view(), name="comment-ratings"),

    url(r'^organizations/?$', Organizations.as_view(), name="organizations"),
    url(r'^organizations/(?P<organization_id>\d+)/?$', Organization.as_view(), name="organization"),

    url(r'^user/?$', User.as_view(), name="user"),
    url(r'^login/?$', Login.as_view(), name="login"),
)
