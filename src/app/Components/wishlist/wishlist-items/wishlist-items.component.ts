import { Component } from '@angular/core';
import { WishlistService } from '../../../../Services/wishlist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist-items',
  imports: [CommonModule],
  templateUrl: './wishlist-items.component.html',
  styleUrl: './wishlist-items.component.css'
})
export class WishlistItemsComponent {

  wishItems$ ;
  constructor(private wishlistService: WishlistService) {
    this.wishItems$ = this.wishlistService.wishItems$;
  }
}
