import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers,
         URLSearchParams, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import * as urljoin from 'url-join';

import { environment } from '../environments/environment';
import { Type, Instrument, InstrumentCategory, Region, CanonicalRoute } from './app.model';
import { Hole, Conductor, Tune, Solist } from './concert/concert.model';


@Injectable()
export class AppService {

  private apiUrl: string = environment.apiUrl;

  // サイトで汎用的に使うモデルは AppService で持っておく
  // TODO フォームでしか使わないものは masterDataManagerService 的なもので持つようにする
  types: Type[] = [];
  instruments: Instrument[] = [];
  instrumentCategories: InstrumentCategory[] = [];
  regions: Region[] = [];
  // TODO 以下は量が莫大になると思われるのでフォームからの検索で取得するようにする(廃止予定)
  holes: Hole[];
  conductors: Conductor[];
  tunes: Tune[];
  solists: Solist[];

  canonicalRoutes: CanonicalRoute[] = [];

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

  getRegions(): void {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const endpointUrl: string = urljoin(this.apiUrl, '/regions');

    this.http.get(endpointUrl, options)
             .map((r: Response) => r.json() as Region[])
             .map((regions: Region[]) => this.regions = regions)
             .subscribe();
  }

  getHoles(): void {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const endpointUrl: string = urljoin(this.apiUrl, '/holes');

    this.http.get(endpointUrl, options)
             .map((r: Response) => r.json() as Hole[])
             .map((holes: Hole[]) => this.holes = holes)
             .subscribe();
  }

  getTunes(): void {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const endpointUrl: string = urljoin(this.apiUrl, '/tunes');

    this.http.get(endpointUrl, options)
             .map((r: Response) => r.json() as Tune[])
             .map((tunes: Tune[]) => this.tunes = tunes)
             .subscribe();
  }

  getConductors(): void {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const endpointUrl: string = urljoin(this.apiUrl, '/conductors');

    this.http.get(endpointUrl, options)
             .map((r: Response) => r.json() as Conductor[])
             .map((conductors: Conductor[]) => this.conductors = conductors)
             .subscribe();
  }

  getSolists(): void {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const endpointUrl: string = urljoin(this.apiUrl, '/solists');

    this.http.get(endpointUrl, options)
             .map((r: Response) => r.json() as Solist[])
             .map((solists: Solist[]) => this.solists = solists)
             .subscribe();
  }

  /**
   * ng2-select で利用可能な形式の Object の配列
   */
  get ng2selectTypes(): Array<{id: number, text: string}> {
    return this.types.map((type: Type) => {
      return { id: type.id, text: type.name };
    });
  }

  /**
   * ng2-select で利用可能な形式の Object の配列
   */
  get ng2selectInstruments(): Array<{id: number, text: string}> {
    return this.instruments.map((instrument: Instrument) => {
      return { id: instrument.id, text: instrument.name };
    });
  }

  /**
   * ng2-select で利用可能な形式の Object の配列
   */
  get ng2selectInstrumentCategories(): Array<{id: number, text: string}> {
    return this.instrumentCategories.map((instrumentCategorie: InstrumentCategory) => {
      return { id: instrumentCategorie.id, text: instrumentCategorie.name };
    });
  }

  /**
   * ng2-select で利用可能な形式の Object の配列
   */
  get ng2selectRegions(): Array<{id: number, text: string}> {
    return this.regions.map((region: Region) => {
      return { id: region.id, text: region.name };
    });
  }


  /**
   * ng2-select で利用可能な形式の Object の配列を返す(なんでもありver)
   */
  ng2selectConverter(items: any[]): Array<{id: number, text: string}> {
    return items.map((item: any) => {
      return { id: item.id, text: item.name };
    });
  }

  getCanonicalRoutes(): Observable<CanonicalRoute[]> {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const url: string = urljoin(this.apiUrl, '/canonical_routes');

    return this.http.get(url, options)
                    .map((r: Response) => r.json() as CanonicalRoute[]);
  }


  /**
   * このサービスで利用する基本の RequestOptions を作成する
   * @return {RequestOptions}
   */
  private generateBasicRequestOptions(): RequestOptions {
    return new RequestOptions({ withCredentials: true });
  }
}

