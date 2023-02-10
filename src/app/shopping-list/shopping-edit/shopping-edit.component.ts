import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameCtrl: ElementRef;
  // @ViewChild('amountInput') amountCtrl: ElementRef;

  // @Output() addIngredient = new EventEmitter<Ingredient>();
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListSvc: ShoppingListService) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription = this.shoppingListSvc.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListSvc.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
        console.log(this.editedItem);
      }
    );
  }

  onAddItem(form: NgForm) {
    // const newIngredient = new Ingredient(this.nameCtrl.nativeElement.value, ~~this.amountCtrl.nativeElement.value)
    const value = form.value;

    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.shoppingListSvc.updateIngredient(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      this.shoppingListSvc.addIngredient(newIngredient);
      window.alert(newIngredient.name + ' successfully added');
    }
    this.editMode = false;
    form.reset();

    // this.addIngredient.emit(newIngredient);
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListSvc.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
