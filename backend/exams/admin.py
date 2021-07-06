from django.contrib import admin

from .models import Exam, ExamResult, Tickets

# Register your models here.

admin.site.register(Exam)
admin.site.register(ExamResult)
admin.site.register(Tickets)