from django.contrib.auth import login as django_login, logout as django_logout
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)

from rest_framework.views import APIView
from rest_framework.generics import ListAPIView

from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import exceptions
from django.views.decorators.csrf import csrf_exempt

from api.authentication import CustomBasicAuthentication
from api.serializers import UserSerializer


from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from rest_framework.pagination import PageNumberPagination

from .models import Recipe
from .serializers import RecipeSerializer
from django.db.models import Q
from .decorators import require_login

class CustomPagination(PageNumberPagination):
    def get_paginated_response(self, data):
        next_page = self.get_next_link()
        if not next_page:
            return Response([])
        return super().get_paginated_response(data)




class LoginView(APIView):
    def post(self, request: Request) -> Response:
        django_login(request, request.user)
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


@method_decorator(require_login, name="dispatch")
class LogoutView(APIView):
    def post(self, request: Request) -> Response:
        django_logout(request)
        return Response({})


@method_decorator(require_login, name="dispatch")
class MeView(APIView):
    def get(self, request: Request) -> Response:
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

@method_decorator(require_login, name="dispatch")
class RecipeListView(ListAPIView):
    model = Recipe
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()
    pagination_class = PageNumberPagination



    def get_queryset(self):
        queryset = super().get_queryset()
        search_params = self.request.query_params.get("search")

        if search_params:
            queryset = queryset.filter(
                Q(title__icontains=search_params) |
                Q(description__icontains=search_params)
            )

        return queryset
    




import requests
from recipe_scrapers import scrape_me
import re
from .models import Ingredient, IngredientType, Member
from django.core.files import File
from urllib.parse import urlparse
from io import BytesIO

def scrape():
    page = 1
    ing_type = IngredientType.objects.get(name='yeehaw')
    admin = Member.objects.get(pk=1)
    while True:
        try:
            response = requests.get('https://www.valdemarsro.dk/wp-json/wp/v2/search', params={'page':page, 'terms':'3705'})
            page += 1
            jsonresp = response.json()

            for item in jsonresp:
                try:
                    scraper = scrape_me(item['url'])
                    #host = scraper.host()
                    title = scraper.title()
                    total_time = scraper.total_time()
                    image_obj = scraper.image()
                    img_resp = requests.get(image_obj)
                    img_resp.raise_for_status()
                    image_file = File(BytesIO(img_resp.content))
                    filename = urlparse(image_obj).path.split('/')[-1]


                    description = scraper.description()
                    ingredients = scraper.ingredients()
                    
                    ingredients_list = [Ingredient.objects.get_or_create(name=value, ingredient_type=ing_type)[0] for value in ingredients]
                    instructions = scraper.instructions()
                    yields = scraper.yields()
                    #print(title, total_time, image_obj, ingredients, instructions, yields)
                    
                    recipe = Recipe(
                        title=title,
                        total_time=total_time,
                        description=description,
                        instructions=instructions,
                        image=image_file,
                        yields=yields,
                        member=admin)
                    recipe.image.save(filename, image_file, save=True)
                    recipe.ingredients.set(ingredients_list)

                    recipe.save()

                    
                    #recipe = Recipe(title=title, total_time=total_time, description='', instructions=instructions, ingredients=ingredients, image=image, yields=yields)
                    #recipe.save()
                except Exception as e:
                    print(e)
            
        except Exception as e:
            print(e)
            break
    print('done')
