import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items = new BehaviorSubject<any[]>([]);
  items$ = this.items.asObservable();

  addToCart(product: any) {
    const current = this.items.value;
    this.items.next([...current, product]);
  }

  getCart() {
    return this.items$; 
  }

  clearCart() {
    this.items.next([]);
  }
}
