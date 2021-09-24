import {
  Component,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('shoppingListForm') shoppingListForm: NgForm;
  isEditMode: boolean = false;
  editingIndex: number;
  editItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.slService.editItemIndex.subscribe((index) => {
      this.editingIndex = index;
      this.isEditMode = true;
      this.editItem = this.slService.getIngredient(index);
      this.shoppingListForm.setValue({
        'name': this.editItem.name,
        'amount': this.editItem.amount
      });

    });
  }

  onSubmit() {
    const ingName = this.shoppingListForm.value.name;
    const ingAmount = this.shoppingListForm.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if(this.isEditMode) {
      this.slService.updateIngredient(this.editingIndex, newIngredient)
    } else {
      this.slService.addIngredient(newIngredient);
    }

    this.isEditMode = false;
    this.shoppingListForm.reset();
  }

  onClear() {
    this.isEditMode = false;
    this.shoppingListForm.reset();
  }

  onDelete() {
    this.slService.deleteIngredient(this.editingIndex);
    this.onClear();
  }

}
