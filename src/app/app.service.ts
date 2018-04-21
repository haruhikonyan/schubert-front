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

  // サイトで汎用的に使うモデルは AppService で持っておく
  types: Type[] = [];
  instruments: Instrument[] = [];
  instrumentCategories: InstrumentCategory[] = [];

  constructor(
    private http: Http,
  ) { }

  getTypes(): void {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const endpointUrl: string = urljoin(this.apiUrl, '/types');

    this.http.get(endpointUrl, options)
             .map((r: Response) => r.json() as Type[])
             .map((types: Type[]) => this.types = types)
             .subscribe();
  }

  getInstruments(): void {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const endpointUrl: string = urljoin(this.apiUrl, '/instruments');

    this.http.get(endpointUrl, options)
             .map((r: Response) => r.json() as Instrument[])
             .map((instruments: Instrument[]) => this.instruments = instruments)
             .subscribe();
  }

  getInstrumentCategories(): void {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const endpointUrl: string = urljoin(this.apiUrl, '/instrument_categories');

    this.http.get(endpointUrl, options)
             .map((r: Response) => r.json() as InstrumentCategory[])
             .map((instrumentCategories: InstrumentCategory[]) => this.instrumentCategories = instrumentCategories)
             .subscribe();
  }

  /**
   * ng2-select で利用可能な形式の Object の配列
   */
  get ng2selectTypes(): Array<{id: string, text: string}> {
    return this.types.map((type: Type) => {
      return { id: type.id.toString(), text: type.name };
    });
  }

  /**
   * ng2-select で利用可能な形式の Object の配列
   */
  get ng2selectInstruments(): Array<{id: string, text: string}> {
    return this.instruments.map((instruments: Instrument) => {
      return { id: instruments.id.toString(), text: instruments.name };
    });
  }

  /**
   * ng2-select で利用可能な形式の Object の配列s
   */
  get ng2selectInstrumentCategories(): Array<{id: string, text: string}> {
    return this.instrumentCategories.map((instrumentCategories: InstrumentCategory) => {
      return { id: instrumentCategories.id.toString(), text: instrumentCategories.name };
    });
  }


  /**
   * このサービスで利用する基本の RequestOptions を作成する
   * @return {RequestOptions}
   */
  private generateBasicRequestOptions(): RequestOptions {
    return new RequestOptions({ withCredentials: true });
  }
}

