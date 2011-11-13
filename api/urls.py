from django.contrib.auth.decorators import login_required
from django.conf.urls.defaults import patterns, url
from views import *

urlpatterns = patterns('api.views',
    url(r'^comments/?$', Comments.as_view(), name="comments"),
    url(r'^comments/(?P<comment_id>\d+)/?$', login_required(Comment.as_view()), name="comment"),
    url(r'^comments/(?P<comment_id>\d+)/rate/?$', login_required(CommentRating.as_view()), name="comment-ratings"),
    
    url(r'^organizations/?$', Organizations.as_view(), name="organizations"),
    url(r'^organizations/(?P<organization_id>\d+)/?$', Organization.as_view(), name="organization"),
)
