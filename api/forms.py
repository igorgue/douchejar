from django import forms

from app import models

class Comment(forms.ModelForm):
    class Meta:
        model = models.Comment
        exclude = ('created_at',)

