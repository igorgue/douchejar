from django.contrib.auth.models import User
from django.forms.models import model_to_dict
from django.db import models

class Organization(models.Model):
    name = models.CharField(max_length=255)

    def __unicode__(self):
        return "{0}".format(self.name.encode('utf-8'))


class CommentManager(models.Manager):
    def get_query_set(self):
        return super(CommentManager, self).get_query_set().order_by('-created_at')

class Comment(models.Model):
    comment = models.CharField(max_length=140)
    price = models.DecimalField(decimal_places=2, max_digits=9, default=1.00)
    organization = models.ForeignKey(Organization, db_index=True)
    user = models.ForeignKey(User, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = CommentManager()

    def __unicode__(self):
        return "{0}... by {1}".format(self.comment[:25].encode('utf-8'), self.user.username)

    @property
    def rating(self):
        ratings = self.rating_set.all().values_list('thumbs_up')
        thumbs_up = 0

        for rate in ratings:
            if rate[0]:
                thumbs_up += 1

        try:
            return len(ratings) / float(thumbs_up)
        except ZeroDivisionError:
            pass

        return 0

    def to_dict(self):
        model = model_to_dict(self)
        
        model['created_at'] = self.created_at
        model['rating'] = self.rating
        
        return model


class Rating(models.Model):
    thumbs_up = models.BooleanField(null=False)
    comment = models.ForeignKey(Comment, db_index=True)
    user = models.ForeignKey(User, db_index=True)

    class Meta:
        unique_together = ('comment', 'user',)

    def __unicode__(self):
        return "Comment #{0}, rated {1}".format(self.comment.comment.encode('utf-8'), self.thumbs_up)
