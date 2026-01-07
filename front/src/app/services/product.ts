import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environment.js"
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  // private apiUrl = `${environment.apiUrl}/products/showalldata`;
  // private baseUrl = 'http://localhost:4000/products/showalldata';
  private baseUrl = `${environment.apiUrl}/products/showalldata`;
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }
}
