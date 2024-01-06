from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Recipe

User = get_user_model()



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "date_joined",
        ]

class RecipeSerializer(serializers.ModelSerializer):
    number_of_collectors = serializers.SerializerMethodField()
    recipe_member = serializers.SerializerMethodField()
    ingredients_list = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = [
            'pk',
            'title',
            'total_time',
            'description',
            'instructions',
            'ingredients_list',
            'image',
            'created_at',
            'updated_at',
            'yields',
            'recipe_member',
            'number_of_collectors',
        ]

    def get_ingredients_list(self, instance):
        return instance.ingredients.values_list('name', flat=True)

    def get_recipe_member(self, instance):
        return instance.member.username

    def get_number_of_collectors(self, instance):
        return instance.number_of_collectors()