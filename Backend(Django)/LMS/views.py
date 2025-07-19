from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.decorators import action
from django.db.models import Case, When, Value, CharField, Exists, OuterRef
from django.db.models.functions import Coalesce






class StudentSignupView(APIView):
    def post(self, request, format=None):
        serializer = StudentSignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Student registered successfully',
                'student_id': serializer.data.get('student_id'),
                'email': serializer.data.get('email')
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@authentication_classes([])
class InstructorSignupView(APIView):
    def post(self, request, format=None):
        serializer = InstructorSignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Instructor registered successfully',
                'instructor_id': serializer.instance.instructor_id,
                'email': serializer.instance.email,
                'department': serializer.instance.department.name  # Include department name in response
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@authentication_classes([])
class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")  # consistent lowercase
        password = request.data.get("password")
        role = request.data.get("role")

        # Validation
        if not all([email, password, role]):
            return Response(
                {"error": "Please provide email, password and role"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        # Get appropriate model and serializer
        if role == 'student':
            model = Student
            serializer_class = StudentSerializer
            id_field = 'student_id'
        elif role == 'instructor':
            model = Instructor
            serializer_class = InstructorSerializer
            id_field = 'instructor_id'
        else:
            return Response(
                {"error": "Invalid role specified"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = model.objects.get(email=email)
        except model.DoesNotExist:
            return Response(
                {"error": "Invalid email or password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not check_password(password, user.password):
            return Response(
                {"error": "Invalid email or password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Create token properly
        token = AccessToken.for_user(user)
        token[id_field] = getattr(user, id_field)
        token["email"] = user.email
        token["role"] = role

        # Serialize user data
        serializer = serializer_class(user)

        return Response(
            {
                "user": serializer.data,  # Use serialized data
                "token": str(token),
            },
            status=status.HTTP_200_OK,
        )
    
# called everytime a route is accessed
@api_view(["POST"])
@authentication_classes([])
def validate_token(request):
    auth_header = request.headers.get("Authorization")
    
    if not auth_header or not auth_header.startswith("Bearer "):
        return Response(
            {"error": "Authorization header with Bearer token is required"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    token = auth_header.split(" ")[1]
    
    if not token:
        return Response(
            {"error": "Token is required"},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    try:
        access_token = AccessToken(token)
        user_id = access_token["user_id"]
        email = access_token["email"]
        role = access_token["role"]
    except Exception:
        return Response(
            {"error": "Invalid token"},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    try:
        model = Student if role == "student" else Instructor
        id_field = "student_id" if role == "student" else "instructor_id"
        user = model.objects.get(**{id_field: user_id, "email": email})
        serializer = StudentSerializer(user) if role == "student" else InstructorSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except (Student.DoesNotExist, Instructor.DoesNotExist):
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )

# def authenticate_api(request):
#     auth_header = request.META.get("HTTP_AUTHORIZATION")
    
#     if not auth_header:
#         return {
#             "error": "Authorization header is required"
#         }, status.HTTP_401_UNAUTHORIZED

#     try:
#         token_type, token = auth_header.split()
#         if token_type.lower() != "bearer":
#             return {
#                 "error": "Invalid token type. Use 'Bearer'"
#             }, status.HTTP_401_UNAUTHORIZED
#     except ValueError:
#         return {
#             "error": "Invalid Authorization header format"
#         }, status.HTTP_400_BAD_REQUEST

#     try:
#         access_token = AccessToken(token)
#         user_id = access_token.get("student_id") or access_token.get("instructor_id")
#         email = access_token["email"]
#         role = access_token["role"]
#     except Exception as e:
#         return {"error": "Invalid token"}, status.HTTP_400_BAD_REQUEST

#     try:
#         if role == "student":
#             user = Student.objects.get(student_id=user_id, email=email)
#             serializer = StudentSerializer(user)
#         elif role == "instructor":
#             user = Instructor.objects.get(instructor_id=user_id, email=email)
#             serializer = InstructorSerializer(user)
#         else:
#             return {"error": "Invalid role in token"}, status.HTTP_401_UNAUTHORIZED
#     except (Student.DoesNotExist, Instructor.DoesNotExist):
#         return {"error": "User not found"}, status.HTTP_404_NOT_FOUND

#     return {
#         "user": serializer.data,
#         "role": role
#     }, status.HTTP_200_OK


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class InstructorViewSet(viewsets.ModelViewSet):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    @action(detail=False, methods=['get'])
    def coursewithstatus(self, request):
        """
        Get all courses with enrollment status for a specific student.
        Returns:
        - Enrollments that exist (with actual enrollment data)
        - Courses not enrolled in marked with NOT_ENROLLED status
        """
        student_id = request.query_params.get('student_id')
        if not student_id:
            return Response(
                {"error": "student_id parameter is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get all enrollments for this student
        student_enrollments = Enrollment.objects.filter(
            student_id=student_id
        ).select_related('course')

        # Get all courses in the system
        all_courses = Course.objects.all()

        response_data = []

        # First add actual enrollments
        for enrollment in student_enrollments:
            response_data.append({
                "enrollment_id": enrollment.enrollment_id,
                "enrollment_date": enrollment.enrollment_date,
                "status": enrollment.status,
                "course": enrollment.course.course_id,
                "student": enrollment.student_id
            })

        # Then add courses not enrolled in
        enrolled_course_ids = {e.course_id for e in student_enrollments}
        for course in all_courses:
            if course.course_id not in enrolled_course_ids:
                response_data.append({
                    "enrollment_id": None,
                    "enrollment_date": None,
                    "status": "NOT_ENROLLED",
                    "course": course.course_id,
                    "student": int(student_id)
                })

        return Response(response_data)


class CourseOfferingViewSet(viewsets.ModelViewSet):
    queryset = CourseOffering.objects.select_related(
        'instructor',
        'course',
        'department'
    ).all()
    serializer_class = CourseOfferingSerializer

    def _enhance_offering(self, offering):
        return {
            **self.get_serializer(offering).data,
            'instructor_name': f"{offering.instructor.name}",
            'course_name': offering.course.course_name,
            'department_name': offering.department.name
        }

    @action(detail=False, methods=['get'], url_path=r'instructor/(?P<instructor_id>\d+)')
    def by_instructor(self, request, instructor_id=None):
        offerings = self.queryset.filter(instructor_id=instructor_id)
        return Response([self._enhance_offering(o) for o in offerings])

    @action(detail=False, methods=['get'], url_path=r'department/(?P<department_id>\d+)')
    def by_department(self, request, department_id=None):
        offerings = self.queryset.filter(department_id=department_id)
        return Response([self._enhance_offering(o) for o in offerings])

    @action(detail=False, methods=['get'], url_path=r'course/(?P<course_id>\d+)')
    def by_course(self, request, course_id=None):
        offering = self.queryset.get(course_id=course_id)
        return Response(self._enhance_offering(offering))


class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        student_id = self.request.query_params.get('student_id')
        course_id = self.request.query_params.get('course_id')
        instructor_id = self.request.query_params.get('instructor_id')
        
        if student_id:
            queryset = queryset.filter(student_id=student_id)
        if course_id:
            queryset = queryset.filter(course_id=course_id)
        if instructor_id:
            # Get courses taught by this instructor
            instructor_courses = CourseOffering.objects.filter(
                instructor_id=instructor_id
            ).values_list('course_id', flat=True)
            
            # Filter enrollments for these courses with PENDING status
            queryset = queryset.filter(
                course_id__in=instructor_courses,
                status='P'  # P for PENDING
            ).select_related('student', 'course')
            
        return queryset

    def list(self, request, *args, **kwargs):
        # Check if we're filtering by instructor_id
        if 'instructor_id' in request.query_params:
            queryset = self.filter_queryset(self.get_queryset())
            
            # Create simplified response
            data = []
            for enrollment in queryset:
                data.append({
                    'enrollment_id': enrollment.enrollment_id,
                    'status': enrollment.status,
                    'course_code': enrollment.course.course_code,
                    'course_name': enrollment.course.course_name,
                    'student_name': enrollment.student.name,
                    'enrollment_date': enrollment.enrollment_date
                })
            return Response(data)
        
        # Default behavior for other cases
        return super().list(request, *args, **kwargs)

    @action(detail=False, methods=['get'])
    def active_courses(self, request):
        student_id = request.query_params.get('student_id')
        if not student_id:
            return Response(
                {"error": "student_id parameter is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        active_enrollments = self.get_queryset().filter(
            student_id=student_id,
            status='A'  # A for ACTIVE
        ).select_related('course')

        data = []
        for enrollment in active_enrollments:
            data.append({
                'enrollment_id': enrollment.enrollment_id,
                'status': enrollment.status,
                'course_id': enrollment.course.course_id,
                'course_code': enrollment.course.course_code,
                'course_title': enrollment.course.course_name,
                'enrollment_date': enrollment.enrollment_date,
            })
        
        return Response(data)


class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        course_id = self.request.query_params.get('course_id')
        
        if course_id:
            queryset = queryset.filter(course_id=course_id)
            
        return queryset

class AssignmentSubmissionViewSet(viewsets.ModelViewSet):
    queryset = AssignmentSubmission.objects.all()
    serializer_class = AssignmentSubmissionSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        assignment_id = self.request.query_params.get('assignment_id')
        student_id = self.request.query_params.get('student_id')
        
        if assignment_id:
            queryset = queryset.filter(assignment_id=assignment_id)
        if student_id:
            queryset = queryset.filter(student_id=student_id)
            
        return queryset
    






from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class AssignmentSubmissionView(APIView):
    parser_classes = [MultiPartParser]  # Required for file uploads

    def post(self, request):
        assignment_id = request.data.get('assignment')
        student_id = request.data.get('student')
        uploaded_file = request.FILES.get('file')  # Get the uploaded file

        if not uploaded_file:
            return Response(
                {"error": "No file provided."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Read the file content as binary
        file_binary = uploaded_file.read()

        # Save to database
        submission = AssignmentSubmission.objects.create(
            assignment_id=assignment_id,
            student_id=student_id,
            file=file_binary,
            file_name=uploaded_file.name,
            file_type=uploaded_file.content_type
        )

        return Response({
            "submission_id": submission.submission_id,
            "message": "PDF saved successfully in database"
        }, status=status.HTTP_201_CREATED)


from django.http import HttpResponse

def download_submission(request, submission_id):
    submission = AssignmentSubmission.objects.get(submission_id=submission_id)
    
    response = HttpResponse(
        submission.file,  # Binary content
        content_type=submission.file_type  # e.g., 'application/pdf'
    )
    response['Content-Disposition'] = f'attachment; filename="{submission.file_name}"'
    return response