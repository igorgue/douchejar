from django import forms
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _

from app import models


class UserForm(forms.ModelForm):
    first_name = forms.CharField()
    last_name = forms.CharField()
    email = forms.EmailField(help_text=_("Required. Needs to be a valid email address."))
    password = forms.CharField()

    class Meta:
        model = User
        exclude = ("is_superuser","is_staff","last_login","groups","user_permissions","date_joined","is_active",)

    def save(self, commit=True):
        user = super(UserForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password"])
        
        if commit:
            user.save()
        return user

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