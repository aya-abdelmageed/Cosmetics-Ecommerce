import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { CartService } from '../../../Services/cart.service';
import { Cart } from '../../../models/cart.model';
import { CartItemComponent} from './cart-item/cart-item.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { HeaderComponent } from '../cart/header/header.component';


@Component({
  selector: 'app-cart',
  imports: [HeaderComponent,CartSummaryComponent, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  authUser: boolean = false;
  useremail : string | null = null;
 
  constructor(private authService: AuthService, private cartService: CartService) {
  
    this.authUser = this.authService.isLoggedIn();
    if(!this.authUser) {
      alert('Please login to view your cart.');
    }
  this.useremail = localStorage.getItem('userEmail');
  if (!this.useremail) {
    alert('User email not found in local storage.');
    return;
  }
  }


 
}

