import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, MatIconModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements OnInit {
  cartCount: number = 0;
  token: string | null = null;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // cart count update
    this.cartService.getCart().subscribe((items) => {
      this.cartCount = items.length;
    });
    this.token = localStorage.getItem('token');
    console.log(this.token);
  }
  logout() {
    localStorage.removeItem('token');
    this.token = null; 
    console.log('User logged out');
  }
}
