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

class CourseOfferingViewSet(viewsets.ModelViewSet):
    queryset = CourseOffering.objects.all()
    serializer_class = CourseOfferingSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        year = self.request.query_params.get('year')
        semester = self.request.query_params.get('semester')
        
        if year:
            queryset = queryset.filter(year=year)
        if semester:
            queryset = queryset.filter(semester=semester)
            
        return queryset

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        student_id = self.request.query_params.get('student_id')
        course_id = self.request.query_params.get('course_id')
        
        if student_id:
            queryset = queryset.filter(student_id=student_id)
        if course_id:
            queryset = queryset.filter(course_id=course_id)
            
        return queryset

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