import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from './cart.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { IProduct } from '../models/products';

@Component({
  selector: 'pm-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  pageTitle = 'Cart:';
  errorMessage = '';
  product: IProduct;
  cartProducts: IProduct[] = [];
  total: number = 0;
  taxes: number = 0;
  promoError: string = 'Promo not applicable';
  isPromoAvailable: boolean = false;
  constructor(private route : ActivatedRoute, private router: Router,
    private cartService: CartService) { }
     ngOnInit(): void{
      this.cartService.getCartProducts().subscribe({
        next: (response) => {
          this.cartProducts = response;
          let prodTotalPrice: number = 0;
          this.cartProducts.forEach((product: IProduct) => {
            prodTotalPrice += product.price;
          });

          this.taxes = Number((prodTotalPrice * 7/100).toFixed(2));
          this.total = prodTotalPrice + this.taxes;
        },
        error: (err: any) => this.errorMessage = err.error
      });
      }

      removeItem(product: IProduct) {
        this.cartService.removeItemFromCart(product).subscribe({
          next: (response) => {
          this.cartProducts = response;  
        },
        error: (err: any) => this.errorMessage = err.error
        });
      }

      // applyCoupon() {
      //   const promo: any = window.document.getElementById('coupon');
      //   if (promo.toUpperCase() === 'DISCOUNT10') {
      //     this.isPromoAvailable = false;
      //     this.total = Number((this.total * 10/100).toFixed(2));
      //     this.taxes = Number((this.total * 7/100).toFixed(2));
      //   } else {
      //     this.isPromoAvailable = true;
      //   }
      // }
}
