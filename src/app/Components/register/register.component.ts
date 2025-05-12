import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../../Services/cart.service';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { WishlistService } from '../../../Services/wishlist.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule ,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  emailExists: boolean = false;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private cartservice: CartService,
    private router: Router,
    private http: HttpClient,
    private wishService : WishlistService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      age: [null, [this.ageValidator]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [this.phoneValidator]],
      password: ['', [Validators.required, this.passwordStrengthValidator]]
    });
    // Reset emailExists if user changes email
    this.registerForm.get('email')?.valueChanges.subscribe(() => {
    this.emailExists = false;
  });
  }

  ageValidator(control: AbstractControl) {
    const value = control.value;
    if (value === null || value === '') return null; // optional
    return value >= 11 && value <= 80 ? null : { invalidAge: true };
  }

  phoneValidator(control: AbstractControl) {
    const value = control.value;
    if (!value) return null; // optional
    const pattern = /^[0-9\-\+]{9,15}$/;
    return pattern.test(value) ? null : { invalidPhone: true };
  }

  passwordStrengthValidator(control: AbstractControl) {
    const value = control.value;
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return pattern.test(value) ? null : { weakPassword: true };
  }

  onRegister() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    const userData = {
      ...this.registerForm.value,
      img: '/Images/profile-avatar.jpg'
    };

    this.http.get<any[]>(`http://localhost:3000/users?email=${userData.email}`).subscribe(users => {
      if (users.length > 0) {
        this.emailExists = true;
        return;
      } else {
        this.emailExists = false;

        this.auth.register(userData).subscribe(() => {
          alert('Registration successful!');
          this.router.navigate(['/login']);
        });

        // this.auth.register(this.user).pipe(
//     switchMap(() => this.cartservice.createCart(this.user.email)),
//     switchMap(() => this.wishService.createWishlist(this.user.email))

        this.cartservice.createCart(userData.email).subscribe(() => {
          console.log('Cart created successfully!');
        });
        this.wishService.createWishlist(userData.email).subscribe(() => {
          console.log('wishlist created successfully!');
        });
      }
    });
  }
}
/*
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
*/

