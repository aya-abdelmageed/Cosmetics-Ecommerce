import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { review } from '../models/review.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private apiUrl = 'https://believed-quaint-frill.glitch.me/reviews';
  private productsUrl = 'https://believed-quaint-frill.glitch.me/products'; 

  constructor(private http: HttpClient) { }
      getReviewByProductId(product_id: number): Observable<review[]> {
        return this.http.get<review[]>(`${this.apiUrl}?product_id=${product_id}`);
}
  getReviews(): Observable<review[]> {
    return this.http.get<review[]>(this.apiUrl);
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);  
  }
}