from django.contrib.auth.models import User
from django.db import models

class Comment(models.Model):
    comment = models.CharField(max_length=140, blank=False, null=False)
    price = models.DecimalField(decimal_places=2, max_digits=9, default=1.00)
    user = models.ForeignKey(User, db_index=True)


class Rating(models.Model):
    thumbs_up = models.BooleanField(null=False)
    comment = models.ForeignKey(Comment, db_index=True)


class Organization(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)


