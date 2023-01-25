import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {

  @Input() recipe: Recipe;
  @Output() recipeSelected = new EventEmitter<Recipe>();
  // 1. receice binded property recipe
  // 2. click a recipe
  // 3. emit the selected recipe

  selectRecipe(recipe: Recipe) {
    //  console.log('selectRecipe (RecipeItemComponent)', recipe)
    this.recipeSelected.emit(recipe);
  }

}
