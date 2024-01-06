from django.contrib import admin

# Register your models here.
from .models import Recipe, Ingredient, IngredientType, Member

admin.site.register(Member)
admin.site.register(Ingredient)
admin.site.register(IngredientType)
admin.site.register(Recipe)