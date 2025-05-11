// products.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map } from 'rxjs';
import { Product } from '../models/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
     map(products => products.filter(p => Number(p.price) !== 0))
);
  }

  getProductById(id : number): Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}

