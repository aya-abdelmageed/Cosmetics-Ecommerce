import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.model';
// import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { ProductsService } from '../../../Services/product.service';

@Component({
  selector: 'app-best-products',
  imports: [SlickCarouselModule ,CommonModule],

  templateUrl: './best-products.component.html',
  styleUrl: './best-products.component.css'
})
export class BestProductsComponent {
  bestProducts: Product[] = [];
  currentBatch: Product[] = [];
  currentIndex = 0;
  displayCount = 3;  
  stepSize = 1;     

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getBestProducts().subscribe(products => {
      this.bestProducts = products.slice(0,30);  
      this.loadNextBatch();
    });

    
  }
  loadNextBatch() {
    if (this.currentIndex + this.displayCount <= this.bestProducts.length) {
      this.currentBatch = this.bestProducts.slice(this.currentIndex, this.currentIndex + this.displayCount);
    } else {
      this.currentIndex = 0;
      this.currentBatch = this.bestProducts.slice(this.currentIndex, this.currentIndex + this.displayCount);
    }
  }
  nextBatch() {
    if (this.currentIndex + this.stepSize < this.bestProducts.length) {
      this.currentIndex += this.stepSize;
    } else {
      this.currentIndex = 0;  
    }
    this.loadNextBatch();
  }

  prevBatch() {
    if (this.currentIndex - this.stepSize >= 0) {
      this.currentIndex -= this.stepSize;
    } else {
      this.currentIndex = Math.max(0, this.bestProducts.length - this.displayCount);  
    }
    this.loadNextBatch();
  }

  wishlist: Product[] = [];

addToCart(product: Product) {
  console.log('Added to cart:', product.name);
}

toggleWishlist(product: Product) {
  const index = this.wishlist.findIndex(p => p.id === product.id);
  if (index > -1) {
    this.wishlist.splice(index, 1);
  } else {
    this.wishlist.push(product);
  }
}

isInWishlist(product: Product): boolean {
  return this.wishlist.some(p => p.id === product.id);
}

}