import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:3000/products';
  constructor(private http : HttpClient) { }

  getProduct(id : string): Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }
}
