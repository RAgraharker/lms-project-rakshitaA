from django.contrib.auth.models import AbstractUser
from django.db import models


# =========================================
# USER
# =========================================

class User(AbstractUser):

    ROLE_CHOICES = (
        ('super_admin', 'Super Admin'),
        ('instructor', 'Instructor'),
        ('student', 'Student'),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='student'
    )


# =========================================
# COURSE
# =========================================

class Course(models.Model):

    title = models.CharField(
        max_length=200
    )

    description = models.TextField()

    youtube_link = models.URLField(
        blank=True,
        null=True
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.title


# =========================================
# MODULE
# =========================================

class Module(models.Model):

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="modules"
    )

    title = models.CharField(
        max_length=200
    )

    order = models.IntegerField(
        default=0
    )

    def __str__(self):
        return self.title


# =========================================
# LESSON
# =========================================

class Lesson(models.Model):

    module = models.ForeignKey(
        Module,
        on_delete=models.CASCADE,
        related_name="lessons"
    )

    title = models.CharField(
        max_length=200
    )

    content = models.TextField(
        blank=True,
        null=True
    )

    video_url = models.URLField(
        blank=True,
        null=True
    )

    resources = models.TextField(
        blank=True,
        null=True
    )

    order = models.IntegerField(
        default=0
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title


# =========================================
# ENROLLMENT
# =========================================

class Enrollment(models.Model):

    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE
    )

    progress = models.IntegerField(
        default=0
    )

    completed = models.BooleanField(
        default=False
    )

    enrolled_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.student.username} - {self.course.title}"


# =========================================
# LESSON PROGRESS
# =========================================

class LessonProgress(models.Model):

    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    lesson = models.ForeignKey(
        Lesson,
        on_delete=models.CASCADE
    )

    completed = models.BooleanField(
        default=False
    )

    completed_at = models.DateTimeField(
        null=True,
        blank=True
    )

    def __str__(self):
        return f"{self.student.username} - {self.lesson.title}"


# =========================================
# ANNOUNCEMENT
# =========================================

class Announcement(models.Model):

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE
    )

    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    message = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.message[:30]