from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser
from django.db import models


class Student(models.Model):
    student_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    class_year = models.CharField(max_length=20)  # e.g., "Freshman", "Sophomore", etc.
    password = models.CharField(max_length=128,null=True)  # when new proper data is entered remove null=True
    
    def __str__(self):
        return f"{self.name} ({self.student_id})"
    
    def set_password(self, raw_password):
        self.password = make_password(raw_password)
    
    def check_password(self, raw_password):
        from django.contrib.auth.hashers import check_password
        return check_password(raw_password, self.password)
    
    @property
    def id(self):
        """Alias for student_id to maintain compatibility"""
        return self.student_id

    
class Department(models.Model):
    department_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

class Instructor(models.Model):
    instructor_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128,null=True)  # when new proper data is entered remove null=True

    
    def __str__(self):
        return f"{self.name} ({self.department})"
    
    def set_password(self, raw_password):
        self.password = make_password(raw_password)
    
    def check_password(self, raw_password):
        from django.contrib.auth.hashers import check_password
        return check_password(raw_password, self.password)

    @property
    def id(self):
        """Alias for instructor_id to maintain compatibility"""
        return self.instructor_id



class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=100)
    course_code = models.CharField(max_length=20, unique=True)
    
    def __str__(self):
        return f"{self.course_code}: {self.course_name}"

# class CourseOffering(models.Model):
#     SEMESTER_CHOICES = [
#         ('FA', 'Fall'),
#         ('SP', 'Spring'),
#     ]
    
#     course_detail_id = models.AutoField(primary_key=True)
#     course = models.ForeignKey(Course, on_delete=models.CASCADE)
#     year = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(4)])
#     semester = models.CharField(max_length=2, choices=SEMESTER_CHOICES)
#     instructor = models.ForeignKey(Instructor, on_delete=models.SET_NULL, null=True)
#     schedule_info = models.CharField(max_length=100)  # e.g., "Mon/Wed 10-11:30"
#     department = models.ForeignKey(Department, on_delete=models.CASCADE)    
#     class Meta:
#         unique_together = ('course', 'year', 'semester', 'instructor')
    
#     def __str__(self):
#         return f"{self.course.course_code} - {self.get_semester_display()} {self.year}"

class CourseOffering(models.Model):
    SEMESTER_CHOICES = [
        ('FA', 'Fall'),
        ('SP', 'Spring'),
    ]
    
    course_detail_id = models.AutoField(primary_key=True)
    course = models.OneToOneField(Course, on_delete=models.CASCADE)  # Changed to OneToOneField
    year = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(4)])
    semester = models.CharField(max_length=2, choices=SEMESTER_CHOICES)
    instructor = models.ForeignKey(Instructor, on_delete=models.SET_NULL, null=True)
    schedule_info = models.CharField(max_length=100)  # e.g., "Mon/Wed 10-11:30"
    department = models.ForeignKey(Department, on_delete=models.CASCADE)    


    def __str__(self):
        return f"{self.course.course_code} - {self.get_semester_display()} {self.year}"


class Enrollment(models.Model):
    STATUS_CHOICES = [
        ('A', 'ACTIVE'),
        ('P', 'PENDING')
    ]
    
    enrollment_id = models.AutoField(primary_key=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    enrollment_date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='P')
    
    class Meta:
        unique_together = ('course', 'student')
    
    def __str__(self):
        return f"{self.student.name} in {self.course.course_code} ({self.get_status_display()})"

class Assignment(models.Model):
    assignment_id = models.AutoField(primary_key=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    title = models.CharField(max_length=200,null=True)
    description = models.TextField(null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField(null=True, blank=True)
    total_points = models.DecimalField(max_digits=5, decimal_places=2,null=True)
    
    def __str__(self):
        return f"{self.title} ({self.course.course_code})"

class AssignmentSubmission(models.Model):
    submission_id = models.AutoField(primary_key=True)
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    submission_date = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='submissions/', null=True, blank=True)
    grade = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        null=True, 
        blank=True,
        validators=[MinValueValidator(0)]
    )
    feedback = models.TextField(blank=True,null=True)
    
    class Meta:
        unique_together = ('assignment', 'student')
    
    def __str__(self):
        return f"{self.student.name}'s submission for {self.assignment.title}"


# class AssignmentSubmission(models.Model):
#     submission_id = models.AutoField(primary_key=True)
#     assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
#     student = models.ForeignKey(Student, on_delete=models.CASCADE)
#     submission_date = models.DateTimeField(auto_now_add=True)
#     file = models.BinaryField(null=True, blank=True)  # PDF stored as binary data
#     file_name = models.CharField(max_length=255, null=True, blank=True)  # Store original filename
#     file_type = models.CharField(max_length=50, null=True, blank=True)  # e.g., 'application/pdf'
#     grade = models.DecimalField(
#         max_digits=5, 
#         decimal_places=2, 
#         null=True, 
#         blank=True,
#         validators=[MinValueValidator(0)]
#     )
#     feedback = models.TextField(blank=True, null=True)
    
#     class Meta:
#         unique_together = ('assignment', 'student')
    
#     def __str__(self):
#         return f"{self.student.name}'s submission for {self.assignment.title}"