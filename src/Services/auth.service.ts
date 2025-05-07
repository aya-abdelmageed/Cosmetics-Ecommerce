import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 // private isLoggedIn = false;
  private baseUrl = 'http://localhost:3000/users';
  private adminEmail = 'rehabmansi668@gmail.com';
  private currentUserEmail: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  register(userData: any) {
    return this.http.post(this.baseUrl,userData);
  }

  login(email: string, password: string) {
    return this.http.get<any[]>(`${this.baseUrl}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          this.currentUserEmail = email;
          localStorage.setItem('userEmail', email);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout() {
    this.currentUserEmail = null;
    localStorage.removeItem('userEmail');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userEmail');
  }

  isAdmin(): boolean {
    return localStorage.getItem('userEmail') === this.adminEmail;
  }  

}

