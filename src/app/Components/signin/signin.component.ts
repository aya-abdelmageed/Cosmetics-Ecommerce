import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const userData = { email: this.email, password: this.password };
    this.authService.login(userData).subscribe((res: any) => {
      this.authService.setToken(res.token); // خزّني التوكن
       this.router.navigate(['/']); // رجّعي المستخدم للصفحة الرئيسية
    });
  }
}
