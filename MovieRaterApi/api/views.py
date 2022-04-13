from django.shortcuts import render
from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import *
from .models import *
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    @action(detail=True, methods = ['POST'])
    def rate_movie(self, request, pk=None):
        if 'stars' in request.data:
            movie = Movie.objects.get(id=pk)
            stars = request.data['stars']
            user = request.user
            user = User.objects.get(id=user.id)
            print('movie title', movie.title, user.username,user.id)
            
            try:
                rating = Rating.objects.get(user=user.id,movie=movie.id)
                rating.stars = stars
                rating.save()
                serializer = Ratingserializer(rating, many=False)
                response = {'message':'rating updated', 'result':serializer.data}
                return Response(response,status=status.HTTP_200_OK)

            except:
                rating = Rating.objects.create(user=user,movie=movie,stars=stars)
                serializer = Ratingserializer(rating, many=False)
                response = {'message':'rating created', 'result':serializer.data}
                return Response(response,status=status.HTTP_200_OK)
                

            
        else:
            response = {'message':'gg'}
            return Response(response,status=status.HTTP_400_BAD_REQUEST) 

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = Ratingserializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def update(self, request, *args, **kwargs):
        response = {'message':'cannot update this way'}
        return Response(response,status=status.HTTP_400_BAD_REQUEST) 

    def create(self, request, *args, **kwargs):
        response = {'message':'cannot create this way'}
        return Response(response,status=status.HTTP_400_BAD_REQUEST)

