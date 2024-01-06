from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager

import datetime
from django.utils import timezone

from django_minio_backend import MinioBackend, iso_date_prefix
# Create your models here.

# Create your models here.
class Member(AbstractUser):  # TODO: Fill descriptions for AbstractUser
    """
    Fields inherited from AbstractUser:
        pk/id:              primary key/id, automatically generated and autoincremented. Can be used as unique
                            membership-number

        username:           
        first_name:
        last_name:
        email:
        password:
        groups:
        user_permissions:
        is_staff:           Used to give access to the Django Admin page
        is_active:          Native Django stuff, used to figure out if email has been confirmed.
                            check https://docs.djangoproject.com/en/3.0/ref/contrib/auth/#django.contrib.auth.models.User.is_active)
        is_superuser:
        last_login:
        date_joined:

    """

    birthday = models.DateField(null=False, blank=False, default=datetime.date.today)
    name = models.CharField(max_length=50)
    biography = models.CharField(max_length=300, null=True, blank=True)
    website = models.URLField(null=True, blank=True)
    recipes = models.ManyToManyField('Recipe', blank=True, related_name='recipes')
    followers = models.ManyToManyField('self', blank=True, symmetrical=False, related_name='member_followers')

    def __str__(self):
        return self.username
    
    def number_of_followers(self):
        return self.followers.count()




class IngredientType(models.Model):
    """
        E.g. Meat, Vegetables, Fish
    """
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Ingredient(models.Model):
    """
        E.g. Salmon, Tomato, Lettuce, Beef
    """
    name = models.CharField(max_length=50)
    ingredient_type = models.ForeignKey(IngredientType, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Recipe(models.Model):
    title = models.CharField(max_length=300)
    total_time = models.IntegerField(default=0)
    description = models.TextField()
    instructions = models.TextField()
    ingredients = models.ManyToManyField(Ingredient)
    image = models.FileField(verbose_name="Object Upload",
                            storage=MinioBackend(bucket_name='django-backend-dev-private'),
                            upload_to=iso_date_prefix)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    yields = models.CharField(max_length=300)
    member = models.ForeignKey('api.Member', on_delete=models.SET_NULL, null=True)
    collectors = models.ManyToManyField('api.Member', related_name='recipe_collectors', blank=True)


    def __str__(self):
        return self.title
    
    def number_of_collectors(self):
        return self.collectors.count()

class Comment(models.Model):
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    member = models.ForeignKey('api.Member', on_delete=models.CASCADE)
    likes = models.ManyToManyField('api.Member', related_name='comment_likes', blank=True)

    def __str__(self):
        return self.text
    
    def number_of_likes(self):
        return self.likes.count()
    

