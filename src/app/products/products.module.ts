import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductListComponent
  ],
  exports: [ProductListComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
