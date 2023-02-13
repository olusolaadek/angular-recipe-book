import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  apiUrl =
    'https://ng-recipe-book-288c9-default-rtdb.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeSvc: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeSvc.getRecipes();
    this.http.put(this.apiUrl, recipes).subscribe((response) => {
      console.log(response);
    });
  }
  fetchRecipes() {
    return this.http.get<Recipe[]>(this.apiUrl).pipe(
      map((responseData) => {
        console.log(responseData);
        return responseData.map((recipe: Recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeSvc.setRecipes(recipes);
      })
    );
  }
}
