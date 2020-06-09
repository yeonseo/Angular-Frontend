import {Injectable, Injector} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs/';
import { catchError } from 'rxjs/operators';
import {RequestService} from "./request.service";
import {AuthenticationService} from "./authentication.service";
import {map} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  private globalToken = 'EmptyToken';
  public error_data = {};
  constructor(
    private injector: Injector,
    private requestService: RequestService,
    private authService: AuthenticationService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token');
    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    }
    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('Interceptor Event--->>>', event);
        }
        return event;
      }),
      catchError(error => {
        this.error_data = {
          error : error,
          reason: error && error.error && error.error.reason ? error.error.reason : '',
          status: error.status
        };
        // error_m = error && error.error && error.error.reason ? error.error.reason : '';
        // status_m = error.status;
        // messeage = error.error.error.message;
        console.log('Interceptor error--->>>', this.error_data );
        return throwError(error);
      })
    );

    // this.authService.currentUser.subscribe((error_data: any) => {
    //   if (error_data) {
    //     this.globalToken = error_data.token;
    //   }
    // });
    // const request = req.headers.has('Authorization') ?
    //   req : req.clone({
    //     setHeaders: {'Authorization': this.globalToken}
    //   });
    // const tokenValue = request.headers.get('Authorization');
    // // console.log('interceptor : ' + tokenValue);
    // return next.handle(request).pipe(
    //   catchError(e => {
    //     console.log(e.error.error.message);
    //     return throwError(e);
    //   })
    // );
  }
}
