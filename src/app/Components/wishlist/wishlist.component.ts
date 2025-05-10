import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { WishlistItemsComponent } from './wishlist-items/wishlist-items.component';

@Component({
  selector: 'app-wishlist',
  imports: [HeaderComponent, WishlistItemsComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {

}
