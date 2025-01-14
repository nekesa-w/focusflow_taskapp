from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()


class LoginSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(required=True)

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret.pop("password", None)
        return ret


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        required=True,
        validators=[validate_password],
    )
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)

    class Meta:
        model = CustomUser
        fields = ("id", "email", "password", "first_name", "last_name")
        read_only_fields = ("id",)

    def validate_email(self, value):
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email has already been registered.")
        return value

    def create(self, validated_data):
        email = validated_data.get("email")
        password = validated_data.get("password")
        first_name = validated_data.get("first_name")
        last_name = validated_data.get("last_name")

        user = CustomUser.objects.create_user(
            email=email, password=password, first_name=first_name, last_name=last_name
        )

        return user


class SubtaskSerializer(serializers.ModelSerializer):
    status = serializers.CharField(
        max_length=50,
        default="Pending",
        required=False,
    )

    class Meta:
        model = Subtask
        fields = ["subtask_id", "task", "title", "status", "created_at"]

    def create(self, validated_data):
        subtask = Subtask.objects.create(**validated_data)
        return subtask


class TaskSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    status = serializers.CharField(
        max_length=50,
        default="Pending",
        required=False,
    )
    subtasks = SubtaskSerializer(many=True, required=False)

    class Meta:
        model = Task
        fields = (
            "task_id",
            "title",
            "status",
            "due_date",
            "created_at",
            "updated_at",
            "user",
            "subtasks",
        )

    def create(self, validated_data):
        task = Task.objects.create(**validated_data)
        return task
