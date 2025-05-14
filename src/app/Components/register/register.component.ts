import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../../Services/cart.service';
import { HttpClient } from '@angular/common/http';
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
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%-_#*?&]{8,}$/;

    return pattern.test(value) ? null : { weakPassword: true };
  }

  onRegister() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    const userData = {
      ...this.registerForm.value,
      img: '/Images/profile-avatar.jpg'
    };

    this.http.get<any[]>(`https://believed-quaint-frill.glitch.me/users?email=${userData.email}`).subscribe(users => {
      if (users.length > 0) {
        this.emailExists = true;
        return;
      } else {
        this.emailExists = false;

        this.auth.register(userData).subscribe(() => {
          //alert('Registration successful!');
          this.router.navigate(['/login']);
        });

  
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

