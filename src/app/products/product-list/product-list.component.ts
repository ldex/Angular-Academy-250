import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title: string = 'Products';
  //products: Product[];
  products$: Observable<Product[]>;
  productsNumber$: Observable<number>;
  selectedProduct: Product;
  errorMessage: string;

  // Pagination
  pageSize = 5;
  start = 0;
  end = this.pageSize;
  currentPage = 1;

  previousPage() {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.currentPage--;
    this.selectedProduct = null;
  }

  nextPage() {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.currentPage++;
    this.selectedProduct = null;
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  constructor(private productService: ProductService) {

   }

  ngOnInit(): void {
    this.products$ = this
                        .productService
                        .products$
                        .pipe(
                          catchError(
                            error => {
                              this.errorMessage = error;
                              return EMPTY;
                            }
                          )
                        );

    this.productsNumber$ = this
                              .products$
                              .pipe(
                                map(products => products.length)
                              );

    // this
    //   .productService
    //   .products$
    //   .subscribe(
    //     data => this.products = data
    //   )
  }

}
