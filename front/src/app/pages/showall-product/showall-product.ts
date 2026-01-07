import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';
import { Hreosection } from '../../components/hreosection/hreosection';
import { CartService } from '../../services/cart';
import { ShowPopup } from '../../components/show-popup/show-popup';

@Component({
  selector: 'app-showall-product',
  templateUrl: './showall-product.html',
  styleUrls: ['./showall-product.css'],
  imports: [CommonModule, ShowPopup],
})
export class ShowallProduct implements OnInit {
  products: Product[] = [];
  showPopup = false;
  addedProductName = '';
  constructor(private productService: ProductService, private cartservice: CartService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(
      (data: any) => {
        this.products = data.products;
        console.log('Products received:', this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addtocart(product: Product) {
    console.log('Added:', product);
    let total: number = parseInt(localStorage.getItem('total') || '0', 10);
    const price = Number(product.product_price);

    total = total + price;

    localStorage.setItem('total', total.toString());

    this.cartservice.addToCart(product);

    this.showPopup = true;
    this.addedProductName = product.product_name;

    setTimeout(() => {
      this.showPopup = false;
    }, 3000);
  }
}
