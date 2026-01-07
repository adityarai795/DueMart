import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-popup',
  imports: [CommonModule],
  templateUrl: './show-popup.html',
  styleUrl: './show-popup.css',
})
export class ShowPopup {
  @Input() productName: string = '';

  constructor(private router: Router) {}

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToCheckout() {
    this.router.navigate(['/checkout']); // agar checkout page hai
  }
}
