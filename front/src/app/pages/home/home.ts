import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';
import { Hreosection } from '../../components/hreosection/hreosection';
import { TrandingProduct } from '../../components/tranding-product/tranding-product';
import { Categories } from '../../components/categories/categories';

@Component({
  selector: 'app-home',
  imports: [Hreosection, CommonModule, TrandingProduct,Categories],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // parent.component.ts
  trendingProducts = [
    { product_name: 'Smartphone', product_price: 9999, image: 'assets/images/product1.jpg' },
    { product_name: 'Headphones', product_price: 1999, image: 'assets/images/product2.jpg' },
    { product_name: 'Watch', product_price: 4999, image: 'assets/images/product3.jpg' },
  ];
}
