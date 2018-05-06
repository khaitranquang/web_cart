from django.contrib.auth import authenticate

from rest_framework import serializers

from .models import User


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, write_only=True, required=False)
    token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'token']
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
class LoginSerializer (serializers.Serializer):
    email = serializers.CharField(max_length=255)
    username = serializers.CharField(max_length=255, read_only=True)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        email = data.get('email', None)
        password = data.get('password', None)

        if email is None:
            raise serializers.ValidationError('An email address is required to log in')
        if password is None:
            raise serializers.ValidationError('A password is required to log in')
        
        user = authenticate(username=email, password=password)

        if user is None:
            raise serializers.ValidationError('A user with this email and password not found')
        if not user.is_active:
            raise serializers.ValidationError('This user has been deactivated')
        return {
            'email': email,
            'username': user.username,
            'token': user.token
        }

# User profile
class UserSerializer (serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, write_only=True, required=False)

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'token',)

        read_only_fields = ('token',)

    # Performs an update on a user1
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for (key, value) in validated_data.items():
            # For the keys remaining in `validated_data`, we will set them on
            # the current `User` instance one at a time.
            setattr(instance, key, value)

        if password is not None:
            # `.set_password()`  handles all
            # of the security stuff that we shouldn't be concerned with.
            instance.set_password(password)

        # After everything has been updated we must explicitly save
        # the model. It's worth pointing out that `.set_password()` does not
        # save the model.
        instance.save()

        return instance