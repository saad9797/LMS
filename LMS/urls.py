from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    StudentViewSet, DepartmentViewSet, InstructorViewSet,
    CourseViewSet, CourseOfferingViewSet, EnrollmentViewSet,
    AssignmentViewSet, AssignmentSubmissionViewSet
)

router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'departments', DepartmentViewSet)
router.register(r'instructors', InstructorViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'course-offerings', CourseOfferingViewSet)
router.register(r'enrollments', EnrollmentViewSet)
router.register(r'assignments', AssignmentViewSet)
router.register(r'assignment-submissions', AssignmentSubmissionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

