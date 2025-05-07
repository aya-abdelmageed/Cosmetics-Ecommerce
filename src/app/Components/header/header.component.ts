import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule ,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  adminEmail = "rehabmansi668@gmail.com"; 
  constructor(private router: Router) {}

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
    this.router.navigate(['/login']);
  }
}
