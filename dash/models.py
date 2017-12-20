from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.

class Task(models.Model):
    author = models.ForeignKey(User, null=True, blank=True)
    title = models.CharField(max_length=200)
    created_date = models.DateTimeField(default=timezone.now)
    due_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title
