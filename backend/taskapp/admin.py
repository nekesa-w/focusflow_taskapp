from django.contrib import admin
from .models import *

admin.site.register(CustomUser)
admin.site.register(Task)
admin.site.register(Subtask)
