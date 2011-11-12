from django.views.generic import View
from utils.decorators import as_json

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
        return {'message': 'get'}


class Comment(View):
    @as_json
    def get(self, request, comment_id):
        """
        Returns specific comment
        """
        return {'message': 'hello-get'}


class CommentRating(View):
    @as_json
    def put(self, request, comment_id):
        """
        Adds a new rating for the comment (+/-)
        """
        return {'message': 'hello-put'}