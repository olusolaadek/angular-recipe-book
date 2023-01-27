import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

  @ViewChild('nameInput') nameCtrl: ElementRef;
  @ViewChild('amountInput') amountCtrl: ElementRef;

  @Output() addIngredient = new EventEmitter<Ingredient>();

  onAdd() {
    const newIngredient = new Ingredient(this.nameCtrl.nativeElement.value, ~~this.amountCtrl.nativeElement.value)
    console.log(newIngredient);
    console.log(this.nameCtrl);

    this.addIngredient.emit(newIngredient);
  }

}
