


from rest_framework.decorators import api_view, permission_classes

from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
import os
from decouple import config
from .serializers import UserSerializer
from .models import (
    User,
    Course,
    Enrollment,
    Module,
    Lesson,
    Announcement,
    LessonProgress
)

from .serializers import (
    CourseSerializer,
    ModuleSerializer,
    LessonSerializer,
    AnnouncementSerializer,
    LessonProgressSerializer
)







# =========================
# LOGIN
# =========================
@api_view(['POST'])
def login_user(request):

    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(
        username=username,
        password=password
    )

    if user is not None:

        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Login successful",
            "token": str(refresh.access_token),
            "refresh": str(refresh),
            "username": user.username,
            "role": user.role,
        })

    return Response(
        {"error": "Invalid credentials"},
        status=401
    )


# =========================
# GET COURSES
# =========================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_courses(request):

    if request.user.role == "instructor":
        courses = Course.objects.filter(
            created_by=request.user
        )
    else:
        courses = Course.objects.all()

    data = []

    for course in courses:

        enrolled = Enrollment.objects.filter(
            student=request.user,
            course=course
        ).exists()

        data.append({
            "id": course.id,
            "title": course.title,
            "description": course.description,
            "youtube_link": course.youtube_link,
            "created_by": course.created_by.id,
            "is_enrolled": enrolled,
        })

    return Response(data)


# =========================
# ADD COURSE
# =========================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_course(request):

    if request.user.role not in [
        'instructor',
        'super_admin'
    ]:
        return Response(
            {"error": "Only instructors/admins can add"},
            status=403
        )

    data = request.data

    course = Course.objects.create(
        title=data.get("title"),
        description=data.get("description"),
        youtube_link=data.get("youtube_link"),
        created_by=request.user
    )

    return Response({
        "message": "Course added successfully"
    })


# =========================
# UPDATE COURSE
# =========================
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_course(request, pk):

    try:
        course = Course.objects.get(id=pk)

    except Course.DoesNotExist:
        return Response(
            {"error": "Course not found"},
            status=404
        )

    if (
        request.user.role == "instructor"
        and course.created_by != request.user
    ):
        return Response(
            {"error": "Unauthorized"},
            status=403
        )

    course.title = request.data.get(
        "title",
        course.title
    )

    course.description = request.data.get(
        "description",
        course.description
    )

    course.youtube_link = request.data.get(
        "youtube_link",
        course.youtube_link
    )

    course.save()

    return Response({
        "message": "Course updated"
    })


# =========================
# DELETE COURSE
# =========================
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_course(request, pk):

    try:
        course = Course.objects.get(id=pk)

    except Course.DoesNotExist:
        return Response({"error": "Course not found"}, status=404)

    # ✅ Restrict roles
    if request.user.role not in ["instructor", "super_admin"]:
        return Response(
            {"error": "Only instructors/admins can delete"},
            status=403
        )

    # ✅ Instructor restriction
    if (
        request.user.role == "instructor"
        and course.created_by != request.user
    ):
        return Response({"error": "Unauthorized"}, status=403)

    course.delete()

    return Response({"message": "Course deleted"})


# =========================
# ENROLL COURSE
# =========================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def enroll_course(request, pk):

    try:
        course = Course.objects.get(id=pk)

    except Course.DoesNotExist:
        return Response(
            {"error": "Course not found"},
            status=404
        )

    Enrollment.objects.get_or_create(
        student=request.user,
        course=course
    )

    return Response({
        "message": "Enrolled successfully"
    })


# =========================
# ANALYTICS DASHBOARD
# =========================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def analytics_dashboard(request):

    # Instructor → own courses only
    if request.user.role == "instructor":
        courses = Course.objects.filter(
            created_by=request.user
        )

    # Admin → all courses
    else:
        courses = Course.objects.all()

    total_courses = courses.count()

    enrollments = Enrollment.objects.filter(
        course__in=courses
    )

    total_students = enrollments.values(
        'student'
    ).distinct().count()

    total_enrollments = enrollments.count()

    # Most popular course
    popular_course = courses.annotate(
        total=Count('enrollment')
    ).order_by('-total').first()

    # Recent enrollments
    recent_enrollments = enrollments.order_by(
        '-enrolled_at'
    )[:5]

    recent_data = []

    for e in recent_enrollments:

        try:
            student_name = e.student.username
        except:
            student_name = "Deleted User"

        recent_data.append({
            "student": student_name,
            "course": e.course.title,
            "date": e.enrolled_at
        })

    # Course-wise data
    course_data = []

    for course in courses:

        count = Enrollment.objects.filter(
            course=course
        ).count()

        course_data.append({
            "title": course.title,
            "students": count
        })

    return Response({
        "total_courses": total_courses,
        "total_students": total_students,
        "total_enrollments": total_enrollments,
        "popular_course": (
            popular_course.title
            if popular_course
            else "N/A"
        ),
        "recent_enrollments": recent_data,
        "course_data": course_data,
    })


# =========================
# ADD MODULE
# =========================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_module(request):

    if request.user.role not in [
        "instructor",
        "super_admin"
    ]:
        return Response(
            {"error": "Unauthorized"},
            status=403
        )

    module = Module.objects.create(
        course_id=request.data.get("course"),
        title=request.data.get("title"),
    )

    return Response({
        "message": "Module added",
        "id": module.id
    })


# =========================
# GET COURSE STRUCTURE
# =========================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_course_structure(request, course_id):

    modules = Module.objects.filter(
        course_id=course_id
    ).order_by('order')

    serializer = ModuleSerializer(
        modules,
        many=True
    )

    # ✅ GET PROGRESS
    try:
        enrollment = Enrollment.objects.get(
            student=request.user,
            course_id=course_id
        )
        progress = enrollment.progress
    except:
        progress = 0

    return Response({
        "modules": serializer.data,
        "progress": progress
    })


# =========================
# ADD LESSON
# =========================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_lesson(request):

    if request.user.role not in [
        "instructor",
        "super_admin"
    ]:
        return Response(
            {"error": "Unauthorized"},
            status=403
        )

    lesson = Lesson.objects.create(
        module_id=request.data.get("module"),
        title=request.data.get("title"),
        content=request.data.get("content"),
        video_url=request.data.get("video_url"),
        resources=request.data.get("resources"),
    )

    return Response({
        "message": "Lesson added",
        "id": lesson.id
    })


# =========================
# GET LESSONS
# =========================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_lessons(request, course_id):

    lessons = Lesson.objects.filter(
        module__course_id=course_id
    ).order_by('module', 'order')

    data = []

    for lesson in lessons:
        completed = LessonProgress.objects.filter(
            student=request.user,
            lesson=lesson,
            completed=True
        ).exists()

        data.append({
            "id": lesson.id,
            "title": lesson.title,
            "video_url": lesson.video_url,
            "completed": completed   # 🔥 IMPORTANT
        })

    return Response(data)


# =========================
# UPDATE LESSON
# =========================
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_lesson(request, lesson_id):

    if request.user.role not in [
        "instructor",
        "super_admin"
    ]:
        return Response(
            {"error": "Unauthorized"},
            status=403
        )

    try:
        lesson = Lesson.objects.get(id=lesson_id)

    except Lesson.DoesNotExist:
        return Response(
            {"error": "Lesson not found"},
            status=404
        )

    lesson.title = request.data.get(
        "title",
        lesson.title
    )

    lesson.content = request.data.get(
        "content",
        lesson.content
    )

    lesson.video_url = request.data.get(
        "video_url",
        lesson.video_url
    )

    lesson.resources = request.data.get(
        "resources",
        lesson.resources
    )

    lesson.save()

    return Response({
        "message": "Lesson updated"
    })


# =========================
# DELETE LESSON
# =========================
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_lesson(request, pk):

    try:
        lesson = Lesson.objects.get(id=pk)

    except Lesson.DoesNotExist:
        return Response(
            {"error": "Lesson not found"},
            status=404
        )

    lesson.delete()

    return Response({
        "message": "Lesson deleted"
    })


# =========================
# COMPLETE LESSON
# =========================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def complete_lesson(request, lesson_id):

    try:
        lesson = Lesson.objects.get(id=lesson_id)
    except Lesson.DoesNotExist:
        return Response({"error": "Lesson not found"}, status=404)

    # ❌ DO NOT create automatically
    progress = LessonProgress.objects.filter(
        student=request.user,
        lesson=lesson
    ).first()

    # ✅ BLOCK IF NOT OPENED
    if not progress:
        return Response({
            "error": "Open lesson first"
        }, status=400)

    # ✅ PREVENT DOUBLE COMPLETE
    if progress.completed:
        return Response({
            "message": "Already completed"
        })

    # mark complete
    progress.completed = True
    progress.completed_at = timezone.now()
    progress.save()

    # calculate progress
    total_lessons = Lesson.objects.filter(
        module__course=lesson.module.course
    ).count()

    completed_lessons = LessonProgress.objects.filter(
        student=request.user,
        lesson__module__course=lesson.module.course,
        completed=True
    ).count()

    percentage = int(
        (completed_lessons / total_lessons) * 100
    )

    enrollment, created = Enrollment.objects.get_or_create(
        student=request.user,
        course=lesson.module.course
    )

    enrollment.progress = percentage

    if percentage == 100:
        enrollment.completed = True

    enrollment.save()

    return Response({
        "message": "Lesson completed",
        "progress": percentage
    })
# =========================
# GET ANNOUNCEMENTS
# =========================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_announcements(request, course_id):

    announcements = Announcement.objects.filter(
        course_id=course_id
    ).order_by('-created_at')

    serializer = AnnouncementSerializer(
        announcements,
        many=True
    )

    return Response(serializer.data)


# =========================
# ADD ANNOUNCEMENT
# =========================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_announcement(request):

    serializer = AnnouncementSerializer(
        data={
            **request.data,
            'author': request.user.id
        }
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(
        serializer.errors,
        status=400
    )


@api_view(['POST'])
def register_user(request):

    username = request.data.get("username")
    password = request.data.get("password")
    role = request.data.get("role", "student")
   
    if role == "super_admin":

     return Response({
        "error":
        "cannot  register as super_admin"
    }, status=403)


    if User.objects.filter(username=username).exists():
        return Response({
            "error": "Username already exists"
        }, status=400)

    user = User.objects.create_user(
        username=username,
        password=password,
        role=role
    )

    return Response({
        "message": "User registered successfully",
        "username": user.username
    })
    
    
@api_view(['POST'])
def forgot_password(request):

    email = request.data.get("email")

    if not email:
        return Response({
            "error": "Email is required"
        }, status=400)

    try:
        user = User.objects.get(username=email)  # username = email
    except User.DoesNotExist:
        return Response({
            "error": "User not found"
        }, status=404)

    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)

    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

    reset_link = f"{FRONTEND_URL}/reset-password/{uid}/{token}/"

    send_mail(
        subject="LMS Password Reset",
        message=f"Click here to reset password:\n{reset_link}",
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[user.username],  # email
        fail_silently=False,
    )

    return Response({
        "message": "Password reset email sent"
    })
    
@api_view(['POST'])
def reset_password(request, uidb64, token):

    try:
        uid = force_str(
            urlsafe_base64_decode(uidb64)
        )

        user = User.objects.get(pk=uid)

    except:
        return Response({
            "error": "Invalid link"
        }, status=400)

    if not default_token_generator.check_token(user, token):
        return Response({
            "error": "Invalid or expired token"
        }, status=400)

    new_password = request.data.get("password")

    user.set_password(new_password)
    user.save()

    return Response({
        "message": "Password reset successful"
    }) 
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_users(request):

    if request.user.role != "super_admin":

        return Response({
            "error": "Unauthorized"
        }, status=403)

    users = User.objects.all().order_by('-id')

    serializer = UserSerializer(
        users,
        many=True
    )

    total_students = User.objects.filter(
        role='student'
    ).count()

    total_instructors = User.objects.filter(
        role='instructor'
    ).count()

    total_admins = User.objects.filter(
        role='super_admin'
    ).count()

    return Response({
        "total_students": total_students,
        "total_instructors": total_instructors,
        "total_admins": total_admins,
        "users": serializer.data
    })
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request, pk):

    if request.user.role != "super_admin":

        return Response({
            "error": "Unauthorized"
        }, status=403)

    try:
        user = User.objects.get(id=pk)

    except User.DoesNotExist:

        return Response({
            "error": "User not found"
        }, status=404)

    # Prevent deleting super admins
    if user.role == "super_admin":

        return Response({
            "error": "Cannot delete super admin"
        }, status=400)

    user.delete()

    return Response({
        "message": "User deleted"
    })

#  =========================
## add user by admin
#  =========================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def admin_add_user(request):

    if request.user.role != "super_admin":

        return Response({
            "error": "Unauthorized"
        }, status=403)

    username = request.data.get("username")
    password = request.data.get("password")
    role = request.data.get("role")

    if User.objects.filter(username=username).exists():

        return Response({
            "error": "Username already exists"
        }, status=400)

    user = User.objects.create_user(
        username=username,
        password=password,
        role=role
    )

    return Response({
        "message": "User added successfully"
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def open_lesson(request, lesson_id):

    try:
        lesson = Lesson.objects.get(id=lesson_id)
    except Lesson.DoesNotExist:
        return Response({"error": "Lesson not found"}, status=404)

    LessonProgress.objects.get_or_create(
        student=request.user,
        lesson=lesson
    )

    return Response({"message": "Lesson opened"})

@api_view(['DELETE'])
def delete_module(request, pk):
    module = Module.objects.get(id=pk)
    module.delete()
    return Response({"message": "Module deleted"})