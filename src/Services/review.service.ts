import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/review.modle';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl = 'http://localhost:3000/reviews';
  private productsUrl = 'http://localhost:3000/products'; 

  constructor(private http: HttpClient) {}

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl);
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);  
  }
}
