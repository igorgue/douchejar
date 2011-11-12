from django.contrib.auth.models import User
from django.forms.models import model_to_dict
from django.db import models

from decimal import Decimal

JAR_TIP_POINT = Decimal('100.00')

class Organization(models.Model):
    name = models.CharField(max_length=255)

    def __unicode__(self):
        return "{0}".format(self.name.encode('utf-8'))

    @property
    def total_money_accumilated(self):
        total = self.comment_set.aggregate(models.Sum('price'))['price__sum']

        return total or 0 # may be null :(

    @property
    def money_accumilated(self):
        times_accumulated = int(self.total_money_accumilated / JAR_TIP_POINT)

        return self.total_money_accumilated - (times_accumulated * JAR_TIP_POINT)

    def to_dict(self):
        model = model_to_dict(self, exclude=['price'])

        model['total_accumilated'] = self.total_money_accumilated
        model['money_accumilated'] = self.money_accumilated

        return model


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
        model = model_to_dict(self, exclude=['price'])

        model['user_name'] = self.user.username
        model['organization_name'] = self.organization.name
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
