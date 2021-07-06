from typing import Callable
from django.db import models
from django.core.validators import MinValueValidator

from courses.models import Course

from users.models import User

# Create your models here.


class Exam(models.Model):
    name = models.CharField(max_length=50, blank=False)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)
    submit_duration = models.IntegerField()
    total_marks = models.IntegerField()
    completed = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.name


class ExamResult(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    student = models.ForeignKey(
        Exam, on_delete=models.CASCADE, related_name='+')
    marks = models.IntegerField(validators=[MinValueValidator(0)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Tickets(models.Model):
    title = models.CharField(max_length=255, blank=False)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=512)
    resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    resolved_by = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, related_name='+', null=True, blank=True)


# testing code by Sid to upload pdf 
# student, examId, answerPDF
class StudentUpload(models.Model): 
    student = models.ForeignKey(User, on_delete=models.CASCADE);
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    answerPDF = models.FileField() #for file input 
     