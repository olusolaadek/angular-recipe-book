import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('Basic White Rice Recipe', `Basic White Rice Recipe`, 'https://www.thespruceeats.com/thmb/kUoSjpktuKuTQpxkm-OFgOxl8s4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-make-basic-white-rice-2355883-10-5b0da96eba6177003622896e.jpg'),
    new Recipe('Test recipe 2', 'This is a test recipe two', 'https://images-gmi-pmc.edge-generalmills.com/75a7343a-1520-4e95-a13f-e61b5fc5b741.jpg')
  ];

}
