from django.contrib import admin
from .models import *
# Register your models here.


admin.site.register(Student)
admin.site.register(Department)
admin.site.register(Instructor)
admin.site.register(Course)
admin.site.register(CourseOffering)
admin.site.register(Enrollment)
admin.site.register(Assignment)
admin.site.register(AssignmentSubmission)
