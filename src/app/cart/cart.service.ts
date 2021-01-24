import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IProduct } from '../models/products';


@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartUrl = 'http://localhost:3005/cart';
    cartDetails = [];
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
    constructor(private http: HttpClient) { }
    getCartProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.cartUrl).pipe(
            tap(data => {
                console.log(JSON.stringify(data))
            }),
            catchError(this.handleError)
        )
    }
    addProductToCart(prod) {
        console.log("inside cart", prod);
        return this.http.post<IProduct>(this.cartUrl, JSON.stringify(prod), this.httpOptions)
            .pipe(
                tap(data => console.log(data)),
                catchError(this.handleError)
            )
    }

    removeItemFromCart(prod) {
        console.log("inside cart", prod);
        return this.http.delete<IProduct[]>(this.cartUrl+ '/' + prod.id,this.httpOptions)
            .pipe(
                tap(data => console.log(data)),
                catchError(this.handleError)
            )
    }

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