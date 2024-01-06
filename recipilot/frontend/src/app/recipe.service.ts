import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getRecipes(page: number, search: string): Observable<Recipe[]> {
    return this.http.get('http://localhost:8000/api/search?page=' + page + '&search=' + search
    , { withCredentials: true}).pipe(
      map((response: any) => response.results as Recipe[])
    );
    }

}
