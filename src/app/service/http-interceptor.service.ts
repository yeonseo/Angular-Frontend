import {Injectable, Injector} from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs/';
import { catchError } from 'rxjs/operators';
import {RequestService} from "./request.service";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  private globalToken = 'EmptyToken';

  constructor(
    private injector: Injector,
    private requestService: RequestService,
    private authService: AuthenticationService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.currentUser) {
      this.authService.currentUser.subscribe((data: any) =>
        this.globalToken = data.token
      );
    }
    const request = req.headers.has('Authorization') ?
      req : req.clone({setHeaders: { 'Authorization': this.globalToken }});

    // if (!request.headers.has('Authorization')) {
    //   req = req.clone({
    //     headers: req.headers.set('Authorization', this.globalToken)
    //   });
    // }

    const tokenValue = request.headers.get('Authorization');
    // console.log('interceptor : ' + tokenValue);
    return next.handle(request).pipe(
      catchError(e => {
        console.log(e.error.error.message);
        return throwError(e);
      })
    );
  }
}
