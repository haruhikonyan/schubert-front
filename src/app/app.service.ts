import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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
    private http: HttpClient,
  ) { }

  getTypes(): void {
    const endpointUrl: string = urljoin(this.apiUrl, '/types');

    this.http.get<Type[]>(endpointUrl)
             .subscribe((types: Type[]) => this.types = types);
  }

  getInstruments(): void {
    const endpointUrl: string = urljoin(this.apiUrl, '/instruments');

    this.http.get<Instrument[]>(endpointUrl)
             .subscribe((instruments: Instrument[]) => this.instruments = instruments);
  }

  getInstrumentCategories(): void {
    const endpointUrl: string = urljoin(this.apiUrl, '/instrument_categories');

    this.http.get<InstrumentCategory[]>(endpointUrl)
             .subscribe((instrumentCategories: InstrumentCategory[]) => this.instrumentCategories = instrumentCategories);
  }

  getRegions(): void {
    const endpointUrl: string = urljoin(this.apiUrl, '/regions');

    this.http.get<Region[]>(endpointUrl)
             .subscribe((regions: Region[]) => this.regions = regions);
  }

  getHoles(): void {
    const endpointUrl: string = urljoin(this.apiUrl, '/holes');

    this.http.get<Hole[]>(endpointUrl)
             .subscribe((holes: Hole[]) => this.holes = holes);
  }

  getTunes(): void {
    const endpointUrl: string = urljoin(this.apiUrl, '/tunes');

    this.http.get<Tune[]>(endpointUrl)
             .subscribe((tunes: Tune[]) => this.tunes = tunes);
  }

  getConductors(): void {
    const endpointUrl: string = urljoin(this.apiUrl, '/conductors');

    this.http.get<Conductor[]>(endpointUrl)
             .subscribe((conductors: Conductor[]) => this.conductors = conductors);
  }

  getSolists(): void {
    const endpointUrl: string = urljoin(this.apiUrl, '/solists');

    this.http.get<Solist[]>(endpointUrl)
             .subscribe((solists: Solist[]) => this.solists = solists);
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
    const url: string = urljoin(this.apiUrl, '/canonical_routes');

    return this.http.get<CanonicalRoute[]>(url);
  }

}

