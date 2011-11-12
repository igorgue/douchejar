from django.contrib.auth.models import User
from django.forms.models import model_to_dict
from django.db import models

class Organization(models.Model):
    name = models.CharField(max_length=255)

    def __unicode__(self):
        return "{0}".format(self.name.encode('utf-8'))


class Comment(models.Model):
    comment = models.CharField(max_length=140)
    price = models.DecimalField(decimal_places=2, max_digits=9, default=1.00)
    organization = models.ForeignKey(Organization, db_index=True)
    user = models.ForeignKey(User, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return "{0}... by {1}".format(self.comment[:25].encode('utf-8'), self.user.username)

    def rating(self):
        return 0

    def to_dict(self):
        return model_to_dict(self)


class Rating(models.Model):
    thumbs_up = models.BooleanField(null=False)
    comment = models.ForeignKey(Comment, db_index=True)
    user = models.ForeignKey(User, db_index=True)

    class Meta:
        unique_together = ('comment', 'user',)

    def __unicode__(self):
        return "Comment #{0}, rated {1}".format(self.comment.comment.encode('utf-8'), self.thumbs_up)
