// products.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map } from 'rxjs';
import { Product } from '../models/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://believed-quaint-frill.glitch.me/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
     map(products => products.filter(p => Number(p.price) !== 0))
);
  }

  
  getBestProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
     map(products => products.filter(p => Number(p.rating) >=5))
);
  }

  getProductById(id : number): Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

}

