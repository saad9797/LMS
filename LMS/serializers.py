from rest_framework import serializers
from .models import *


class StudentSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    username = serializers.CharField(source='name', required=True)
    classYear = serializers.CharField(source='class_year', required=True)
    
    class Meta:
        model = Student
        fields = ('student_id','username', 'email', 'password', 'classYear')
        extra_kwargs = {
            'email': {'required': True},
        }
    
    def create(self, validated_data):
        # Extract password and remove it from validated_data
        password = validated_data.pop('password')
        
        # Create student instance
        student = Student(**validated_data)
        
        # Set hashed password
        student.set_password(password)
        
        student.save()
        return student

class InstructorSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    username = serializers.CharField(source='name', required=True)
    department_id = serializers.IntegerField(write_only=True, required=True)


    class Meta:
        model = Instructor
        fields = ('username', 'department_id', 'email', 'password')
        extra_kwargs = {
            'email': {'required': True},
            'name' : {'required': True},
        }

    def validate_department_id(self, value):
        if not Department.objects.filter(department_id=value).exists():
            raise serializers.ValidationError("Department does not exist")
        return value
    
    def create(self, validated_data):
        # Extract password and department_id
        password = validated_data.pop('password')
        department_id = validated_data.pop('department_id')
        
        # Create instructor instance
        instructor = Instructor(**validated_data)
        instructor.department_id = department_id
        
        # Set hashed password
        instructor.set_password(password)
        
        instructor.save()
        return instructor



# Auth part :

# class StudentLoginSerializer(serializers.Serializer):
#     email = serializers.EmailField(required=True)
#     password = serializers.CharField(required=True, write_only=True)
    
#     def validate(self, data):
#         email = data.get('email')
#         password = data.get('password')
        
#         try:
#             student = Student.objects.get(email=email)
#         except Student.DoesNotExist:
#             raise serializers.ValidationError("Invalid email or password")
        
#         if not student.check_password(password):
#             raise serializers.ValidationError("Invalid email or password")
        
#         data['student'] = student
#         return data




class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class CourseOfferingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseOffering
        fields = '__all__'

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = '__all__'

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'

class AssignmentSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentSubmission
        fields = '__all__'