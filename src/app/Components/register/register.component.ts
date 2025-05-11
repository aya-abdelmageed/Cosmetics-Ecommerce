import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../Services/cart.service';
import { catchError, forkJoin, of, switchMap } from 'rxjs';
import { WishlistService } from '../../../Services/wishlist.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    name: '',
    age: null,
    email: '',
    phone: '',
    img: '',
    password: ''
  };

  constructor(private auth: AuthService, private cartservice : CartService, private wishService : WishlistService, private router: Router) {}

onRegister() {
    this.user.img = '/Images/profile-avatar.jpg';
    
    // First register the user
    this.auth.register(this.user).pipe(
      // After successful registration, create cart and wishlist in parallel
      switchMap(() => forkJoin([
        this.cartservice.createCart(this.user.email).pipe(
          catchError(err => {
            console.error('Error creating cart:', err);
            return of(null); // Continue even if cart creation fails
          })
        ),
        this.wishService.createWishlist(this.user.email).pipe(
          catchError(err => {
            console.error('Error creating wishlist:', err);
            return of(null); // Continue even if wishlist creation fails
          })
        )
      ]))
    ).subscribe({
      next: () => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        alert('Registration failed. Please try again.');
      }
    });
  }
}