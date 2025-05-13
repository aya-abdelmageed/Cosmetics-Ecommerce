import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.model';
import { ProductsService } from '../../../Services/product.service';
import { CartService } from '../../../Services/cart.service';
import { WishlistService } from '../../../Services/wishlist.service';

@Component({
  selector: 'app-best-products',
  imports: [SlickCarouselModule, CommonModule],
  templateUrl: './best-products.component.html',
  styleUrl: './best-products.component.css'
})
export class BestProductsComponent {
  bestProducts: Product[] = [];
  currentBatch: Product[] = [];
  currentIndex = 0;
  displayCount = 3;  
  stepSize = 1;
  isLoading = true;

  constructor(
    private productsService: ProductsService, 
    private cartservice: CartService, 
    public wishService: WishlistService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.isLoading = true;
    this.productsService.getBestProducts().subscribe({
      next: (products) => {
        this.bestProducts = products.slice(0, 30);
        this.loadNextBatch();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.isLoading = false;
      }
    });
  }

  loadNextBatch(): void {
    if (this.currentIndex + this.displayCount <= this.bestProducts.length) {
      this.currentBatch = this.bestProducts.slice(this.currentIndex, this.currentIndex + this.displayCount);
    } else {
      this.currentIndex = 0;
      this.currentBatch = this.bestProducts.slice(this.currentIndex, this.currentIndex + this.displayCount);
    }
  }

  nextBatch(): void {
    if (this.currentIndex + this.stepSize < this.bestProducts.length) {
      this.currentIndex += this.stepSize;
    } else {
      this.currentIndex = 0;
    }
    this.loadNextBatch();
  }

  prevBatch(): void {
    if (this.currentIndex - this.stepSize >= 0) {
      this.currentIndex -= this.stepSize;
    } else {
      this.currentIndex = Math.max(0, this.bestProducts.length - this.displayCount);
    }
    this.loadNextBatch();
  }

  addtobag(id: number): void {
    this.cartservice.addToCart(id).subscribe({
      next: (cart) => {
        if (cart) {
          alert("💖 Great pick! Your beauty essential is on its way to your bag.");
          console.log("Added to cart successfully");
        }
      },
      error: (err) => {
        console.error("Couldn't add to cart:", err);
      }
    });
  }

  addtowish(id: number): void {
    this.wishService.addToWishlist(id).subscribe({
      next: (wish) => {
        if (wish) {
          // Wishlist updated automatically via wishlist$ observable
        }
      },
      error: (err) => {
        console.error("Error adding to wishlist:", err);
      }
    });
  }
}