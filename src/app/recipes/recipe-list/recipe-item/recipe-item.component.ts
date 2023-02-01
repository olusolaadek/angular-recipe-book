import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {

  @Input() recipe: Recipe;
  @Input() index: number;
  // @Output() recipeSelected = new EventEmitter<Recipe>();
  // 1. receice binded property recipe
  // 2. click a recipe
  // 3. emit the selected recipe
  constructor(
    private recipeService: RecipeService
  ) {

  }
  // onSelected() {
  //   //  console.log('selectRecipe (RecipeItemComponent)', recipe)
  //   this.recipeService.recipeSelected.emit(this.recipe);
  // }

}
