from django.shortcuts import get_object_or_404
from django.views.generic import View

from utils.decorators import as_json
from app import models

class Comments(View):
    @as_json
    def put(self, request):
        """
        Adds new comment
        """
        return {'message': 'put'}

    @as_json
    def get(self, request):
        """
        Returns all comments
        """
        comment_models = models.Comment.objects.all()
        comments = []

        for comment in comment_models:
            comments.append(comment.to_dict())

        return comments


class Comment(View):
    @as_json
    def get(self, request, comment_id):
        """
        Returns specific comment
        """
        comment = get_object_or_404(models.Comment, id=comment_id)

        return comment.to_dict()


class CommentRating(View):
    @as_json
    def put(self, request, comment_id):
        """
        Adds a new rating for the comment (+/-)
        """
        return {'message': 'hello-put'}