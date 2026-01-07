import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCart().subscribe((items) => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  increaseQty(item: any) {
    item.quantity += 1;
    this.calculateTotal();
  }

  decreaseQty(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.calculateTotal();
    }
  }

  removeItem(item: any) {
    this.cartItems = this.cartItems.filter((p) => p !== item);
    this.cartService.clearCart(); // reset
    this.cartService.addToCart([...this.cartItems]); // re-add updated
    this.calculateTotal();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.totalPrice = 0;
  }
}
