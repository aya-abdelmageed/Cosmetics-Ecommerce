import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 // private isLoggedIn = false;
  private baseUrl = 'https://believed-quaint-frill.glitch.me/users';
  private adminEmail = 'rehabmansi668@gmail.com';
  private currentUserEmail: string | null = null;
  auth$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    //if refresh happens, check if user is logged in and update the auth$
    const email = localStorage.getItem('userEmail');
    if (email) {
      this.auth$.next(email);
    }
   }

  register(userData: any) {
    return this.http.post(this.baseUrl,userData);

  }

  login(email: string, password: string) {
    return this.http.get<any[]>(`${this.baseUrl}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          this.currentUserEmail = email;
          localStorage.setItem('userEmail', email);
          this.auth$.next(email);
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
    caches.delete('userEmail');
    this.auth$.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userEmail');
  }

  isAdmin(): boolean {
    return localStorage.getItem('userEmail') === this.adminEmail;
  }  
  
  
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}

