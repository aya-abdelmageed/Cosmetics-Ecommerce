import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../Services/cart.service';
import { switchMap } from 'rxjs';

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

  constructor(private auth: AuthService, private cartservice : CartService, private router: Router) {}


onRegister() {
  this.user.img = '/Images/profile-avatar.jpg';
  
  this.auth.register(this.user).pipe(
    switchMap(() => this.cartservice.createCart(this.user.email))
  ).subscribe(() => {
    alert('Registration successful!');
    this.router.navigate(['/login']);
  });
}
}
