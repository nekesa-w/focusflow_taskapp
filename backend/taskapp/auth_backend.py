from django.contrib.auth import get_user_model
from knox.models import AuthToken

User = get_user_model()


class EmailAuthBackend:
    def authenticate(self, request, email=None, password=None):
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                token = AuthToken.objects.create(user=user)[1]
                return user, token
        except User.DoesNotExist:
            return None, None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=id)
        except User.DoesNotExist:
            return None
