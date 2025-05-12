import { Component ,OnInit, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryNavComponent } from '../category-nav/category-nav.component'; // Fixed import name
import { ProductListComponent} from '../product-list/product-list.component'; // Fixed import name
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Shop',
  standalone: true,
  imports: [RouterOutlet, CategoryNavComponent,ProductListComponent], // Use PascalCase
  templateUrl: './Shop.component.html',
  styleUrl: './Shop.component.css'
})
export class ShopComponent implements OnInit {
  initialCategories: string[] = [];

  constructor(private route: ActivatedRoute) {}
@ViewChild('productList') productList!: ProductListComponent;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['categories']) {
        this.initialCategories = params['categories'].split(',');
        console.log('Categories from URL:', this.initialCategories);
      }
    });
  }

  ngAfterViewInit() {
    // Now productList is guaranteed to be available
    if (this.initialCategories.length > 0) {
      this.applyCategoryFilter();
    }
  } 
  private applyCategoryFilter() {
    if (this.productList && this.productList.filterByCategory) {
      this.productList.filterByCategory(this.initialCategories);
    } else {
      console.error('ProductList component or filter method not available');
    }
  }
}