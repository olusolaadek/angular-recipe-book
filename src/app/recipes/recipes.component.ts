import { Component } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  recipe: Recipe;

  onRecipeReceived(recipe: Recipe) {
    this.recipe = recipe;
    // console.log('recipe received: ', this.recipe)
  }
}
