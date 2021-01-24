import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { IProduct } from '../models/products';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  errorMessage = '';
  product: IProduct[] ;

  constructor(private route : ActivatedRoute, private router: Router,
              private productService: ProductService) { }

  public ngOnInit(): void{
  let id = this.route.snapshot.paramMap.get('id');
  this.productService.getProductById(id).subscribe({
    next: (response) => {
      this.product = response;
    },
    error: (err: any) => this.errorMessage = err.error
  });
  }
  onBack(): void {
    this.router.navigate(['/products']);
  }
}
