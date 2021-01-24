import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { HttpClient,HttpErrorResponse} from '@angular/common/http';
import { IProductCategory } from './product-category';


@Injectable({
    providedIn: 'root'
})
export class ProductCategoryService{
    private productCategoryUrl = 'http://localhost:3001/categories';
    constructor(private http: HttpClient){}
    productsWithCategories$ = this.http.get<IProductCategory[]>(this.productCategoryUrl)
    .pipe(
      tap(data=>console.log("categories:"+JSON.stringify(data))),
      catchError(this.handleError)
    )
    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      }
}