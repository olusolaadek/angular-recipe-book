import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  // @Input()
  recipe: Recipe;
  id: number;

  constructor(
    private slService: ShoppingListService,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router

  ) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      // console.log(this.id);
      this.recipe = this.recipeService.getRecipe(this.id);
    });


  }

  sendToShoppingList() {
    /**
     * call shopping cardService.sendToShoppingList(this.recipe)
     *  */
    this.slService.sendToShoppingList(this.recipe);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

}
