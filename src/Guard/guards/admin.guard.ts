import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const userEmail = localStorage.getItem('userEmail');
    const adminEmail = "rehabmansi668@gmail.com";  
    if (userEmail === adminEmail) {
      return true;
    } else {
      this.router.navigate(['/not-authorized']);  
      return false;
    }
  }
}
