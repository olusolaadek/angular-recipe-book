import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // @Output() featureSelected = new EventEmitter<string>();
  constructor(
    private dataSvc: DataStorageService,
    private recipeSvc: RecipeService
  ) {}
  ngOnInit(): void {
    this.onFetchData();
  }

  onSelect(feature: string) {
    //  this.featureSelected.emit(feature);
    // console.log('selected : ' + feature);
  }

  onSaveData() {
    this.dataSvc.storeRecipes();
  }
  onFetchData() {
    this.dataSvc.fetchRecipes().subscribe((recipes) => {
      // this.recipeSvc.setRecipes(recipes);
    });
  }
}
