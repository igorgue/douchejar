from django.shortcuts import get_object_or_404
from django.views.generic import View
from django.utils import simplejson

from utils.decorators import as_json
from utils.http import HttpResponseBadRequest, HttpResponseNoContent
from app import models
from api import forms

class Comments(View):
    @as_json
    def post(self, request):
        """
        Adds new comment
        """
        data = request.POST.copy()
        data['user'] = request.user.id

        form = forms.Comment(data)

        if form.is_valid():
            form.save()
            return HttpResponseNoContent

        return form.errors.copy(), HttpResponseBadRequest

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
    def post(self, request, comment_id):
        """
        Adds a new rating for the comment (+/-)
        """
        return {'message': 'hello-post'}


class Organizations(View):
    @as_json
    def get(self, request):
        """
        Returns all organization
        """
        organization_models = models.Organization.objects.all()
        organizations = []

        for organization in organization_models:
            organizations.append(organization.to_dict())

        return organizations

class Organization(View):
    @as_json
    def get(self, request, organization_id):
        """
        Returns specific organization
        """
        organization = get_object_or_404(models.Organization, id=organization_id)

        return organization.to_dict()
