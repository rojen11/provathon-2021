from django.contrib import admin

from courses.models import Course, CourseNotification, CourseUser

# Register your models here.

class CourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    fields = ('name', 'primary_teacher', 'code', 'limit')
    readonly_fields = ('code',)

admin.site.register(Course, CourseAdmin)
admin.site.register(CourseUser)
admin.site.register(CourseNotification)