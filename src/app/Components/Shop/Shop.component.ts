import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryNavComponent } from '../category-nav/category-nav.component'; // Fixed import name
import { ProductListComponent} from '../product-list/product-list.component'; // Fixed import name

@Component({
  selector: 'app-Shop',
  standalone: true,
  imports: [RouterOutlet, CategoryNavComponent,ProductListComponent], // Use PascalCase
  templateUrl: './Shop.component.html',
  styleUrl: './Shop.component.css'
})
export class ShopComponent {
  
}