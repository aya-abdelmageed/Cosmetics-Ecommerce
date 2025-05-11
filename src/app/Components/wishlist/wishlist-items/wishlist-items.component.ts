import { Component } from '@angular/core';
import { WishlistService } from '../../../../Services/wishlist.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../Services/cart.service';

@Component({
  selector: 'app-wishlist-items',
  imports: [CommonModule],
  templateUrl: './wishlist-items.component.html',
  styleUrl: './wishlist-items.component.css'
})
export class WishlistItemsComponent {

  
  constructor(private wishlistService: WishlistService, private cartServices: CartService) {
    this.wishItems$ = this.wishlistService.wishItems$;
  }

  wishItems$;

  addtobag(id:number):void{
    this.cartServices.addToCart(id).subscribe(cart => {
      if(cart)
      {
        this.removefromwish(id);
        alert("Added to cart Successfully")
        
      }
      else
        console.log("can't add to cart")
    }
    );
  }

  removefromwish(id:number):void{
    console.log('Attempting to remove:', id); // Debug log
    this.wishlistService.removeFromWishlist(id).subscribe({
      next : () => {
        alert("removed from wishlist Successfully")
      },
      error : (err) => 
        console.log("can't remove item")
    }
    );
  }
}
