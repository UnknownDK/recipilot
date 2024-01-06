from django.urls import path


from api import views


urlpatterns = [
    path("auth/login", views.LoginView.as_view()),
    path("auth/logout", views.LogoutView.as_view()),
    path("me", views.MeView.as_view()),
    path("search", views.RecipeListView.as_view())
]