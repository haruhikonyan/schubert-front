import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers,
         URLSearchParams, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import * as urljoin from 'url-join';

import { environment } from '../../environments/environment';
import { Recruit } from './recruit.model';


@Injectable()
export class RecruitService {

  private apiUrl: string = environment.apiUrl;
  private endpointUrl: string = urljoin(this.apiUrl, '/recruits');

  constructor(
    private http: Http,
  ) { }

  getRecruits(): Observable<Recruit[]> {
    const options: RequestOptions = this.generateBasicRequestOptions();

    return this.http.get(this.endpointUrl, options)
                    .map((r: Response) => r.json() as Recruit[]);
  }

  getRecruit(id: string): Observable<Recruit> {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const url: string = urljoin(this.endpointUrl, id);

    return this.http.get(url, options)
                    .map((r: Response) => r.json() as Recruit);
  }

  createRecruit(recruit: Recruit): Observable<Recruit> {
    const options: RequestOptions = this.generateBasicRequestOptions();

    return this.http.post(this.endpointUrl, {recruit: recruit}, options)
                    .map((r: Response) => r.json() as Recruit);
  }


  /**
   * このサービスで利用する基本の RequestOptions を作成する
   * @return {RequestOptions}
   */
  private generateBasicRequestOptions(): RequestOptions {
    return new RequestOptions({ withCredentials: true });
  }
}
