import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import * as AOS from 'aos';
import { CategorySliderComponent } from '../category-slider/category-slider.component';
import { HomeReviewsComponent } from "../home-reviews/home-reviews.component";
import { HomeImageComponent } from "../home-image/home-image.component";
import { HeroSliderComponent } from "../hero-slider/hero-slider.component";
import { BestProductsComponent } from "../best-products/best-products.component";
@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule, CategorySliderComponent, HomeReviewsComponent, HomeImageComponent, HeroSliderComponent, BestProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {


  ngOnInit(): void {}

  ngAfterViewInit(): void {
    AOS.init({
      duration: 1000,  
      once: true,      
    });
  }
  


    // section 2 
    constructor(public router: Router) {}

    onCategorySelected(categories: string[]) {
     // Convert array to comma-separated string for URL
      const categoryParam = categories.join(',');
      this.router.navigate(['/Shop'], { 
        queryParams: { categories: categoryParam } 
      });
    }
}
