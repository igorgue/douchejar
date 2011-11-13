from django.forms.models import model_to_dict
from django.shortcuts import get_object_or_404
from django.views.generic import View
from django.utils import simplejson

from utils.decorators import as_json, authorized_user, unauthorized_user
from utils.http import HttpResponseBadRequest, HttpResponseNoContent, HttpResponseUnauthorized
from app import models
from api import forms

class Comments(View):
    @authorized_user
    @as_json
    def post(self, request):
        """
        Adds new comment
        """
        data = simplejson.loads(request.read())
        data['user'] = request.user.id

        form = forms.CommentForm(data)

        if form.is_valid():
            form.save()
            return {"id": form.instance.id}

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
        data = simplejson.loads(request.read())
        data['user'] = request.user.id

        form = forms.CommentRatingForm(data)

        if form.is_valid():
            form.save()
            return {"id": form.instance.id}

        return form.errors.copy(), HttpResponseBadRequest

    @as_json
    def put(self, request, comment_id):
        """
        Update a new rating for the comment (+/-)
        """
        data = simplejson.loads(request.read())
        data['user'] = request.user.id

        rating = get_object_or_404(models.Rating, id=data.get("id", 0), user__id=data['user'])

        form = forms.CommentRatingForm(data, instance=rating)

        if form.is_valid():
            form.save()
            return HttpResponseNoContent

        return form.errors.copy(), HttpResponseBadRequest

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


class User(View):
    @authorized_user
    @as_json
    def get(self, request):
        return model_to_dict(request.user, exclude=(
            "is_superuser","is_staff","last_login","groups","user_permissions","password","date_joined","is_active",
        ))

    @unauthorized_user
    @as_json
    def post(self, request):
        """
        Adds a new user
        """
        data = simplejson.loads(request.read())

        form = forms.UserForm(data)

        if form.is_valid():
            form.save()
            return {"id": form.instance.id}

        return form.errors.copy(), HttpResponseBadRequest