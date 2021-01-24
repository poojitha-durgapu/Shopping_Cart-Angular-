import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { IProduct } from '../models/products';

@Component({
  selector: 'pm-productlist',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  title: string = 'Product List';
  imageBtnFlag: boolean = false;
  _searchInput = '';
  errorMessage: string = '';
  get searchInput(): string {
    return this._searchInput;
  }
  set searchInput(value: string) {
    this._searchInput = value;
    this.searchedProducts = this.searchInput ? this.performSearch(this.searchInput) : this.products;
  }
  searchedProducts: IProduct[] = [];
  products: IProduct[] = [];
  constructor(private prodService: ProductService, private router: Router, private cartService: CartService) { }
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.prodService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.searchedProducts = this.products;
      },
      error: err => this.errorMessage = err
    })
  }
  onImgBtnClick(): void {
    this.imageBtnFlag = !this.imageBtnFlag;
  }
  performSearch(searchBy: string): IProduct[] {
    searchBy = searchBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(searchBy) != -1
    )
  }
  OnRatingClicked(msgFromChild: string): void {
    this.title = 'Product List: ' + msgFromChild;
  }
  addToCart(product: IProduct[]) {
    this.router.navigate(['/cart']);
    console.log("addedproduct", product);
    this.cartService.addProductToCart(product).subscribe(data => {
    });
  }

}