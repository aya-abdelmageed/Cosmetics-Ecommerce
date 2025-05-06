import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register(this.user).subscribe({
      next: (res: any) => {
        // ممكن ترسلي التوكن لو حابة، أو تنقليه لصفحة تسجيل الدخول
        alert('تم التسجيل بنجاح');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('حدث خطأ أثناء التسجيل');
        console.error(err);
      }
    });
  }
}
