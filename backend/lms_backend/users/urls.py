from django.urls import path
from .views import (
    admin_add_user,
    register_user,
    add_course,
    get_courses,
    update_course,
    delete_course,
    enroll_course,
    analytics_dashboard,
    get_lessons,
    add_lesson,
    update_lesson,
    delete_lesson,
    get_course_structure,
    complete_lesson,
    get_announcements,
    add_announcement,
    add_module,
    register_user,
    login_user,
    forgot_password,
    reset_password,
    get_all_users,
    delete_user,
    admin_add_user,
    db_status,
    open_lesson,
    delete_module,
    create_admin,
    api_home,
    
    
    
)

# ✅ IMPORT THESE
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenSerializer


# ✅ DEFINE THIS CLASS (YOU MISSED THIS)
class MyTokenView(TokenObtainPairView):
    serializer_class = MyTokenSerializer


urlpatterns = [
    path('login/', MyTokenView.as_view(), name='login'),
    path('register/', register_user),

    path('forgot-password/', forgot_password),
    path('reset-password/<uidb64>/<token>/', reset_password),
    path("", api_home, name="api_home"),
    path('courses/', get_courses),
    path('add-course/', add_course),
    path('update-course/<int:pk>/', update_course),
    path('delete-course/<int:pk>/', delete_course),
    path('create-admin/', create_admin),
    path('enroll/<int:pk>/', enroll_course),
    path('analytics/', analytics_dashboard),

    path('lessons/<int:course_id>/', get_lessons),
    path('add-module/', add_module),
    path('add-lesson/', add_lesson),
    path('update-lesson/<int:lesson_id>/', update_lesson),
    path('delete-lesson/<int:pk>/', delete_lesson),

    path('course-structure/<int:course_id>/', get_course_structure),
    path('complete-lesson/<int:lesson_id>/', complete_lesson),

    path('announcements/<int:course_id>/', get_announcements),
    path('add-announcement/', add_announcement),

    path('all-users/', get_all_users),
    path('db-status/', db_status),
    path('delete-user/<int:pk>/', delete_user),
    path('admin-add-user/', admin_add_user),
    path(
    'open-lesson/<int:lesson_id>/',
    open_lesson),
    path('delete-module/<int:pk>/', delete_module),
]
