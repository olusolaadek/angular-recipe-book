import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

  @ViewChild('nameInput') nameCtrl: ElementRef;
  @ViewChild('amountInput') amountCtrl: ElementRef;


  // @Output() addIngredient = new EventEmitter<Ingredient>();

  constructor(
    private shoppingListSvc: ShoppingListService
  ) {

  }

  onAdd(event) {
    event.preventDefault();
    const newIngredient = new Ingredient(this.nameCtrl.nativeElement.value, ~~this.amountCtrl.nativeElement.value)
    this.shoppingListSvc.addIngredient(newIngredient)
    console.log(newIngredient);
    console.log(this.nameCtrl);

    // this.addIngredient.emit(newIngredient);
  }

}
