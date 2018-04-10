import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers,
         URLSearchParams, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as urljoin from 'url-join';

import { environment } from '../environments/environment';
import { Type, Instrument, InstrumentCategory } from './app.model';


@Injectable()
export class AppService {

  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: Http,
  ) { }

  getTypes(): Observable<Type[]> {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const endpointUrl: string = urljoin(this.apiUrl, '/types');

    return this.http.get(endpointUrl, options)
                    .map((r: Response) => r.json() as Type[]);
  }

  getInstruments(): Observable<Instrument[]> {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const endpointUrl: string = urljoin(this.apiUrl, '/instruments');

    return this.http.get(endpointUrl, options)
                    .map((r: Response) => r.json() as Instrument[]);
  }

  getInstrumentCategories(): Observable<InstrumentCategory[]> {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const endpointUrl: string = urljoin(this.apiUrl, '/instrument_categories');

    return this.http.get(endpointUrl, options)
                    .map((r: Response) => r.json() as InstrumentCategory[]);
  }


  /**
   * このサービスで利用する基本の RequestOptions を作成する
   * @return {RequestOptions}
   */
  private generateBasicRequestOptions(): RequestOptions {
    return new RequestOptions({ withCredentials: true });
  }
}

