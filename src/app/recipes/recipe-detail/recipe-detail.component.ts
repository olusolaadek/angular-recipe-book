import { AfterViewInit, Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {

  @Input()
  recipe: Recipe;


  // onRecipeSelected(recipe: Recipe) {
  //   console.log('recipe selected (onRecipeSelected): ', recipe);
  //   this.recipe = recipe;
  // }
}
