import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request: HttpRequest<any> = req.clone();

    console.log('interceptor');
    return next.handle(request).pipe(
      catchError(e => {
        console.log(e.error.error.message);
        return throwError(e);
      })
    );
  }
}
