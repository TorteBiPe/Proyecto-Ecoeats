import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { Product } from "./product";
import { Router } from "@angular/router";
import swal from 'sweetalert2';

@Injectable({
  providedIn: "root"
})
export class ProductsService {

  private urlEndPoint: string = 'http://localhost:8081/api/products';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient, private router: Router) {}

  getProducts(): Observable<any> {
    return this.http.get(this.urlEndPoint);
  }
  
  create(product: Product): Observable<Product> {
    return this.http.post(this.urlEndPoint, product, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.product as Product),
      catchError(e => {

        if (e.status == 400) {
          return throwError(() =>e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() =>e);
      })
    );
  }

  getProduct(id: any): Observable<Product> {
    return this.http.get<Product>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/products']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() =>e);
      })
    );
  }

  update(product: Product): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${product.id}`, product, { headers: this.httpHeaders }).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(() =>e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() =>e);
      })
    );
  }

  delete(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() =>e);
      })
    );
  }
}