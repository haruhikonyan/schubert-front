import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers,
  URLSearchParams, ResponseContentType } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import * as urljoin from 'url-join';

import { environment } from './../../environments/environment';
import { Concert } from './concert.model';

@Injectable()
export class ConcertService {

  private apiUrl: string = environment.apiUrl;
  private endpointUrl: string = urljoin(this.apiUrl, '/concerts');

  constructor(
    private http: Http,
    private authHttp: AuthHttp
  ) { }

  getConcerts(): Observable<Concert[]> {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const params: URLSearchParams = new URLSearchParams();

    return this.http.get(this.endpointUrl, options)
                    .map((r: Response) => r.json() as Concert[]);
  }

  /**
   * このサービスで利用する基本の RequestOptions を作成する
   * @return {RequestOptions}
   */
  private generateBasicRequestOptions(): RequestOptions {
    return new RequestOptions({ withCredentials: true });
  }

}
