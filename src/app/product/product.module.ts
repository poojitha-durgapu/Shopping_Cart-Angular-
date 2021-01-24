import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from '../cart/cart.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
  ],
  imports: [
    RouterModule.forChild([
      {path:'products', component:ProductListComponent},
      {path:'products/:id', canActivate: [ProductDetailGuard],component:ProductDetailComponent},
      {path:'cart', component: CartComponent}
    ]),
    SharedModule
  ]
})
export class ProductModule { }
