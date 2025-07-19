from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

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
    path('student-signup/', StudentSignupView.as_view(),name='Student-SignUp'),
    path('instructor-signup/', InstructorSignupView.as_view(),name='Instructor-SignUp'),
    path('login/', LoginView.as_view(),
    name='student-login'),
    path('token-authenticate/', validate_token ,
    name='token-authenticate'),
    
    # path('submit-assignment/', AssignmentSubmissionView.as_view(), name='submit-assignment'),
    # path('download/<int:submission_id>/', download_submission, name='download-submission'),

]

