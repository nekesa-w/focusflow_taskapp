from django.db import models


class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password_hash = models.CharField(max_length=255)
    task_breakdown_depth = models.IntegerField(
        default=1
    )  # e.g., 1 for simple, 2 for detailed
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username


class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tasks")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(
        max_length=50,
        choices=[
            ("pending", "Pending"),
            ("completed", "Completed"),
            ("overdue", "Overdue"),
        ],
    )
    due_date = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Subtask(models.Model):
    subtask_id = models.AutoField(primary_key=True)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="subtasks")
    title = models.CharField(max_length=255)
    status = models.CharField(
        max_length=50,
        choices=[
            ("pending", "Pending"),
            ("completed", "Completed"),
        ],
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
