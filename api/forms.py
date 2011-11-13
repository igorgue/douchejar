from django import forms

from app import models

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