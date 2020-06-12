import {Injectable, Injector} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs/';
import { catchError } from 'rxjs/operators';
import {RequestService} from "./request.service";
import {AuthenticationService} from "./authentication.service";
import {map, retry} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  private globalToken = 'EmptyToken';
  public error_data = {};
  public errorCostom = {};
  constructor(
    private injector: Injector,
    private requestService: RequestService,
    private authService: AuthenticationService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token: string = localStorage.getItem('token');
    const currentUser: string = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + currentUser['token']) });
    }
    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    return next.handle(req).pipe(
      retry(3),
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

        if (this.error_data['status'] === 400) {
          this.errorCostom = {'message' : '잘못된 요청입니다. 입력칸을 다시 확인해주세요. \n계속 오류가 발생될 경우, 관리자에게 문의바랍니다.'};
          // return this.errorCostom; -> Observable ㅠㅠ
        }
        if (this.error_data['status'] === 403) {
          this.errorCostom = {'message' : '접근 권한이 없습니다. 권한 변경을 원하시면 관리자에게 문의바랍니다.'};
        }

        if (this.errorCostom['message'] !== '') {
          alert(this.errorCostom['message']);
          // return; 이것도 아닌듯 ㅠㅠ
        }
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
