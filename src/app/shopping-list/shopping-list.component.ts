import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingredientsChangedSubject: Subscription;

  constructor(
    private shoppingListSvc: ShoppingListService
  ) {

  }
  ngOnDestroy(): void {
    this.ingredientsChangedSubject.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListSvc.getIngredients()
    this.ingredientsChangedSubject = this.shoppingListSvc.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients
    })
  }

  // onReceivedIngredient(ingredient: Ingredient): void {
  //   this.ingredients.push(ingredient);
  //   console.log('Received ingredient: ', ingredient);
  // }

}
