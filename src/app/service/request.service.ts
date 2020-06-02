import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class RequestService {

  protected http: HttpClient;

  constructor(httpClient: HttpClient) {
    this.http = httpClient;
  }

  public request(url, params = null, callback = null) {
    const headers = new HttpHeaders().set('Authorization', 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VybmFtZSI6InRlc3QiLCJleHAiOjE1OTExMDIyMTd9.VuBflHbQi8ZF2_LCQfDEcczmqws9sIqAYHLaKoOgqHk');
    url = `http://192.168.0.134:8000${url}`;
    const promise = new Promise((resolve, reject) => {
      this.http.get(url, {headers}).subscribe(data => {
        if (callback) {
          callback(data);
        }
      });
    });
  }
}
