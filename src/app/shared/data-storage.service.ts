import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  apiUrl =
    'https://ng-recipe-book-288c9-default-rtdb.firebaseio.com/recipes.json';

  constructor(
    private http: HttpClient,
    private recipeSvc: RecipeService,
    private authSer: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeSvc.getRecipes();
    this.http.put(this.apiUrl, recipes).subscribe((response) => {
      console.log(response);
    });
  }
  fetchRecipes() {
    // get token only once and unsubscribe
    // return this.authSer.user.pipe(
    //   take(1),
    //   exhaustMap((user) => {
    //     ;
    //   }),;//

    // {
    //     params: new HttpParams().set('auth', null),
    //   }

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
