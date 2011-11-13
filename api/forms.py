from django import forms
from django.contrib.auth.models import User

from app import models


class UserForm(forms.ModelForm):
    class Meta:
        model = User
        exclude = ("is_superuser","is_staff","last_login","groups","user_permissions","password","date_joined","is_active",)


class CommentForm(forms.ModelForm):
    class Meta:
        model = models.Comment
        exclude = ('created_at',)


class CommentRatingForm(forms.ModelForm):
    class Meta:
        model = models.Rating

    def clean_thumbs_up(self):
        thumbs_up = self.data['thumbs_up']

        return thumbs_up == "+"