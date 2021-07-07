from django.db import models

from users.models import User

from nanoid import generate

# Create your models here.

class Course(models.Model):
    name = models.CharField(max_length=50, blank=False)
    primary_teacher = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=15, blank=True, unique=True)
    limit = models.IntegerField(default=-1, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)
    

    def save(self, *args, **kwargs):
        self.code = generate(size=11)
        super(Course,self).save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name


class CourseNotification(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField(max_length=1024)


class CourseUser(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (('course', 'user'),)


