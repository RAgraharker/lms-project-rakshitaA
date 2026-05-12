from django.contrib import admin
from django.urls import path, include
from users.views import home


urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')), 
    
    # ✅ correct
]
