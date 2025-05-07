import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class SigninComponent {
  email = '';
  password = '';

  constructor(private authService:  AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(success => {
      if (success) {
        if (this.authService.isAdmin()) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/']);
        }
      } else {
        alert('Invalid email or password');
      }
    });
  }
}
