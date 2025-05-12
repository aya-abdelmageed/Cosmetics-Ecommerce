import { Component } from '@angular/core';
import { WishlistService } from '../../../../Services/wishlist.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../Services/cart.service';
import { Observable, switchMap } from 'rxjs';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-wishlist-items',
  imports: [CommonModule],
  templateUrl: './wishlist-items.component.html',
  styleUrl: './wishlist-items.component.css'
})
export class WishlistItemsComponent {
  wishItems$: Observable<Product[]>;
  
  constructor(
    private wishlistService: WishlistService, 
    private cartServices: CartService
  ) {
    this.wishItems$ = this.wishlistService.wishItems$;
  }

  addtobag(id: number): void {
    this.cartServices.addToCart(id).pipe(
      switchMap(cart => {
        if (!cart) {
          throw new Error("Couldn't add to cart");
        }
        // Chain the removal after successful cart addition
        return this.wishlistService.removeFromWishlist(id);
      })
    ).subscribe({
      next: () => {
        alert("Added to cart and removed from wishlist successfully");
        // No need to manually update - service handles it through updateWishItems()
      },
      error: (err) => {
        console.error("Operation failed:", err);
        alert(err.message || "Operation failed");
      }
    });
  }

  removefromwish(id: number): void {
    this.wishlistService.removeFromWishlist(id).subscribe({
      next: () => {
        alert("Removed from wishlist successfully");
      },
      error: (err) => {
        console.error("Couldn't remove item:", err);
        alert("Failed to remove from wishlist");
      }
    });
  }
}