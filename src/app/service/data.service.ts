import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {retry, catchError, tap } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = 'http://192.168.0.134:8000/';

  constructor(private httpClient: HttpClient, private router: Router) { }

  // [GET]
  // sends a GET request to the REST API endpoint to retrieve JSON data
  public sendGetRequest( url: string ) {
    // Add safe, URL encoded_page parameter
    url = this.REST_API_SERVER + url;
    const options = { params: new HttpParams()};
    return this.httpClient.get(url).pipe(
      catchError(this.handleError)
    );
  }

  // [POST]
  //
  public createRequest(url: string, body: object ){
    // Add safe, URL encoded_page parameter
    url = this.REST_API_SERVER + url;

    return this.httpClient.post(url, body).pipe(
      catchError(this.handleError)
    );
  }

  // [PUT]
  //
  public updateRequest(url: string, body: object ){
    // Add safe, URL encoded_page parameter
    url = this.REST_API_SERVER + url;

    return this.httpClient.put(url, body).pipe(
      catchError(this.handleError)
    );
  }

  // [PUT]
  //
  public deleteRequest(url: string) {
    // Add safe, URL encoded_page parameter
    url = this.REST_API_SERVER + url;

    return this.httpClient.delete(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  public goBoardList(): void {
    this.router.navigateByUrl('/board-list');
  }
}
