from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import *
from .models import *
from rest_framework.response import Response
from django.contrib.auth import get_user_model, authenticate
from knox.models import AuthToken
from datetime import datetime
from rest_framework import status

User = get_user_model()


class LoginViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]
            user = authenticate(request, username=email, password=password)
            if user:
                _, token = AuthToken.objects.create(user)
                return Response(
                    {
                        "user": {
                            "user_id": user.id,
                            "first_name": user.first_name,
                            "last_name": user.last_name,
                            "email": user.email,
                        },
                        "token": token,
                    }
                )
            else:
                return Response({"error": "Invalid credentials"}, status=401)
        else:
            return Response(serializer.errors, status=400)


class RegisterViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)


class UserViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def list(self, request):
        queryset = User.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class TaskViewset(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TaskSerializer

    def create(self, request):
        if not request.user.is_authenticated:
            return Response(
                {"detail": "Authentication credentials were not provided."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        due_date = request.data.get("due_date")
        if not due_date:
            return Response(
                {"detail": "Due date is required."}, status=status.HTTP_400_BAD_REQUEST
            )

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            task = serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            task = Task.objects.get(pk=pk, user=request.user)
            new_status = request.data.get("status")
            due_date = request.data.get("due_date")
            title = request.data.get("title")

            if new_status and new_status not in ["Pending", "Completed"]:
                return Response(
                    {"detail": "Invalid status value"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if new_status:
                task.status = new_status

            if due_date:
                task.due_date = due_date

            if title:
                task.title = title

            task.save()
            serializer = self.serializer_class(task)
            return Response(serializer.data)

        except Task.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    def list(self, request):
        queryset = Task.objects.filter(user=request.user)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        try:
            task = Task.objects.get(pk=pk, user=request.user)
            task.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Task.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)


class SubtaskViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SubtaskSerializer

    def list(self, request):
        task_id = request.query_params.get("task_id")
        if task_id:
            subtasks = Subtask.objects.filter(task__task_id=task_id)
        else:
            subtasks = Subtask.objects.all()

        serializer = SubtaskSerializer(subtasks, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = SubtaskSerializer(data=request.data)
        if serializer.is_valid():
            subtask = serializer.save()
            return Response(SubtaskSerializer(subtask).data, status=201)
        return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        try:
            subtask = Subtask.objects.get(subtask_id=pk)
            serializer = SubtaskSerializer(subtask)
            return Response(serializer.data)
        except Subtask.DoesNotExist:
            return Response({"detail": "Not found."}, status=404)

    def update(self, request, pk=None):
        try:
            subtask = Subtask.objects.get(subtask_id=pk)
            serializer = SubtaskSerializer(subtask, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        except Subtask.DoesNotExist:
            return Response({"detail": "Not found."}, status=404)

    def destroy(self, request, pk=None):
        try:
            subtask = Subtask.objects.get(subtask_id=pk)
            subtask.delete()
            return Response(status=204)
        except Subtask.DoesNotExist:
            return Response({"detail": "Not found."}, status=404)
