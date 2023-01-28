import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Basic White Rice Recipe', `Basic White Rice Recipe`, 'https://www.relish.com/image-resizer/fit=cover,f=auto,w=412/https://www.thespruceeats.com/thmb/bF8lW-24nQMOaEWNajRfK97hA60=/2848x2848/smart/filters:no_upscale()/how-to-make-basic-white-rice-2355883-10-5b0da96eba6177003622896e.jpg'),
    new Recipe('Test recipe 2', 'This is a test recipe two', 'https://images-gmi-pmc.edge-generalmills.com/75a7343a-1520-4e95-a13f-e61b5fc5b741.jpg'),
    new Recipe('Pounded yam', 'Pounded yam served with a egusi soup, stork fish and bokoto.', 'https://desirerecipes.com/wp-content/uploads/2022/02/image-24.jpg.webp')
  ];

  getRecipes() {
    return this.recipes.slice();
  }

}
