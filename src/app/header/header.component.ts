import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() featureSelected = new EventEmitter<string>();
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(
    private dataSvc: DataStorageService,
    private authService: AuthService // private recipeSvc: RecipeService
  ) {}
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe({
      next: (user) => {
        // this.isAuthenticated = !user ? false : true;
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
        console.log('isAuthenticated? ', this.isAuthenticated);

        if (this.isAuthenticated) {
          this.onFetchData();
        }
      },
    });
    //
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
