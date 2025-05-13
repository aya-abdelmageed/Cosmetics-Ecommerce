import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
// import { reviews } from '../../../models/reviews.modle';
// import { ReviewService } from '../../../Services/review.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.model';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { ProductsService } from '../../../Services/product.service';
import { review } from '../../../models/review.model';
import { ReviewsService } from '../../../Services/reviews.service';
@Component({
  selector: 'app-home-reviews',
  imports: [SlickCarouselModule ,CommonModule],
templateUrl: './home-reviews.component.html',
  styleUrl: './home-reviews.component.css'
})
export class HomeReviewsComponent {
  allReviews: review[] = [];
  currentBatch: review[] = [];
  batchSize = 3;
  currentIndex = 0;

  constructor(
    private reviewService: ReviewsService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.reviewService.getReviews().subscribe(data => {
      this.allReviews = data.filter(review => review.stars >= 4).slice(0, 10);  

      this.productsService.getProducts().subscribe(products => {
        this.allReviews.forEach(review => {
          this.productsService.getProductById(review.product_id).subscribe(product => {
            review['product_name'] = product ? product.name : 'Product Not Found';
            
          });
        });

        this.loadNextBatch();  
      });
    });
  }

  loadNextBatch() {
    const next = this.allReviews.slice(this.currentIndex, this.currentIndex + this.batchSize);
    if (next.length > 0) {
      this.currentBatch = next;
      this.currentIndex += this.batchSize;
    } else {
      this.currentIndex = 0;
      this.loadNextBatch();  
    }
  }

  nextBatch() {
    this.loadNextBatch();
  }

  prevBatch() {
    this.currentIndex -= this.batchSize * 2;
    if (this.currentIndex < 0) this.currentIndex = 0;
    this.loadNextBatch();
  }
}