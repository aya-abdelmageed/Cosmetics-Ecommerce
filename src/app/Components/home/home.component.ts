import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategorySliderComponent } from "../category-slider/category-slider.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [CategorySliderComponent,FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
constructor(public router: Router) {}

  onCategorySelected(categories: string[]) {
   // Convert array to comma-separated string for URL
    const categoryParam = categories.join(',');
    this.router.navigate(['/Shop'], { 
      queryParams: { categories: categoryParam } 
    });
  }
}
