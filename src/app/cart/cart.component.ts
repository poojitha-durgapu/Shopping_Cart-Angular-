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
  pageTitle = 'Welcome to Cart';
  errorMessage = '';
  product: IProduct;
  cartProducts: IProduct[] = [];
  total: number = 0;
  constructor(private route : ActivatedRoute, private router: Router,
    private cartService: CartService) { }
     ngOnInit(): void{
      this.cartService.getCartProducts().subscribe({
        next: (response) => {
          this.cartProducts = response;
          this.cartProducts.forEach((product: IProduct) => {
            this.total += product.price;
          })
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
}
