import { Component, OnInit, EventEmitter, Input,  } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  throttle = 0;
  distance = 2;
  page = 1;
  search = '';
  recipes: Recipe[] | any[] = [];
  isLoading: boolean = false;
  loadedImageCount = 0;
  range = [0, 1, 2, 3, 4, 5, 6, 7];


  subject: Subject<any> = new Subject();


  constructor(private recipeService: RecipeService) {
    this.subject
      .pipe(debounceTime(500))
      .subscribe((search) => {
          this.search = search;
          this.isLoading = false;
          this.recipeService
          .getRecipes(this.page, this.search)
          .subscribe((recipes: Recipe[]) => {
              this.recipes = recipes;
          });
        }
      );


  }
  ngOnInit(): void {
    this.recipeService
      .getRecipes(this.page, this.search)
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }
  onScroll(): void {
    this.recipeService
      .getRecipes(++this.page, this.search)
      .subscribe((recipes: Recipe[]) => {
        this.recipes.push(...recipes);
      });
  }

  onInput(e: any) {
    this.subject.next(e.target.value);
    this.isLoading = true;
    this.page = 1;
  }

  onFormKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }


}