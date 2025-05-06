import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private baseUrl = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient, private router: Router) { }

  
  login(data: any) {
    return this.http.post(`${this.baseUrl}`, data);
  }

  register(data: any) {
    return this.http.post(`${this.baseUrl}`, data);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken(); // لو في توكن يبقى داخل
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

