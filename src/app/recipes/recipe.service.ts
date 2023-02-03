import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }

  // recipeSelected = new Subject<Recipe>();
  // recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Basic White Rice Recipe',
      `Basic White Rice Recipe`,
      'https://www.relish.com/image-resizer/fit=cover,f=auto,w=412/https://www.thespruceeats.com/thmb/bF8lW-24nQMOaEWNajRfK97hA60=/2848x2848/smart/filters:no_upscale()/how-to-make-basic-white-rice-2355883-10-5b0da96eba6177003622896e.jpg',
      [new Ingredient('cup long-grain white rice', 1), new Ingredient('cups of water', 2), new Ingredient('teaspoon salt', 0.5)]
    ),
    new Recipe('Chicken sauce recipe',
      'This is a test recipe two',
      'https://images-gmi-pmc.edge-generalmills.com/75a7343a-1520-4e95-a13f-e61b5fc5b741.jpg',
      [new Ingredient('chicken breasts', 2), new Ingredient('red bell pepper', 1), new Ingredient('Carrot', 2)]),
    new Recipe('Pounded yam',
      'Pounded yam served with a egusi soup, stork fish and bokoto.',
      'https://desirerecipes.com/wp-content/uploads/2022/02/image-24.jpg.webp',
      [new Ingredient('Tuber of Yam', 1)])
  ];

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number): Recipe {
    //  console.log(this.recipes[index]);
    return this.recipes[index];
  }

}
