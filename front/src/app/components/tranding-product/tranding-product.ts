import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tranding-product',
  imports: [CommonModule],
  templateUrl: './tranding-product.html',
  styleUrl: './tranding-product.css',
})
export class TrandingProduct {
  @Input() products: any[] = [];
  defaultImage: string = 'assets/images/default-product.png';
}
