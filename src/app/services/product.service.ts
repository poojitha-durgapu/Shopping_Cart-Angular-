import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient,HttpErrorResponse} from '@angular/common/http';
import { IProduct } from '../models/products';


@Injectable({
    providedIn: 'root'
})
export class ProductService{
    private productUrl = 'http://localhost:3000/products';
    constructor(private http: HttpClient){}
    getProducts(): Observable<IProduct[]>{
       return this.http.get<IProduct[]>(this.productUrl).pipe(
           tap(data=>console.log(JSON.stringify(data))),
           catchError(this.handleError)
           );
    }
    getProductById(id){
     console.log(id);
        return this.http.get<IProduct[]>(this.productUrl+ '/' + id).pipe(
            tap(data=>console.log(JSON.stringify(data))),
            catchError(this.handleError)
      );
     }
   
    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        return throwError(errorMessage);
      }
    
}