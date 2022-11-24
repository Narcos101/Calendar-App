from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token', # when i hit this route i should get the access token, it gives us access to user information when the user is authenticated
        '/api/token/refresh' # when i hit this route i should get the refresh token, it helps to renew the access token, so no need of authentication agag
    ]   
    return Response(routes)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

