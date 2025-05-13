import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../Services/cart.service';
import { AuthService } from '../../../Services/auth.service';
import { WishlistService } from '../../../Services/wishlist.service';
import { count } from 'rxjs';


@Component({
  selector: 'app-header',
  imports: [CommonModule ,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  adminEmail = "rehabmansi668@gmail.com"; 
  user: string | null = null;
  cartItemsCount:any;
  wishItemsCount: any;

  constructor(private router: Router, private auth:AuthService  ,private cartService: CartService, private wishService: WishlistService) {
    this.cartService.cartItemCount$.subscribe(count => {
    this.cartItemsCount = count;
});
  this.wishService.wishItemCount$.subscribe(count => {
    this.wishItemsCount = count;
  })
  }


  isLoggedIn() {
    return !!localStorage.getItem('userEmail');
  }

  isAdmin() {
    return localStorage.getItem('userEmail') === this.adminEmail;
  }

  isUser() {
    return this.isLoggedIn() && !this.isAdmin();
  }

  logout() {
    localStorage.removeItem('userEmail');
    this.router.navigate(['/']);
  }
}
