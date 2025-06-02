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
    this.cartServices.addToCart(id).subscribe({
      next: (cart) => {
        alert("💖 Great pick! Your beauty essential is on its way to your bag.");
        console.log("Added to cart Successfully", cart);
      },
      error: (err) => {
        console.error("Operation failed:", err);
        //alert(err.message || "Operation failed");
      }
    });
  }

  removefromwish(id: number): void {
    this.wishlistService.removeFromWishlist(id).subscribe({
      next: (updatedwishlist) => {
      console.log('Updated wishlist:', updatedwishlist);
        //alert("Removed from wishlist successfully");
      },
      error: (err) => {
        console.error("Couldn't remove item:", err);
        //alert("Failed to remove from wishlist");
      }
    });
  }
}