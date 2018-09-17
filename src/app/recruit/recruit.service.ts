import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import * as urljoin from 'url-join';

import { environment } from '../../environments/environment';
import { Instrument, Type } from './../app.model';
import { Recruit, SearchCondition } from './recruit.model';


@Injectable()
export class RecruitService {

  private apiUrl: string = environment.apiUrl;
  private endpointUrl: string = urljoin(this.apiUrl, '/recruits');

  constructor(
    private http: HttpClient
  ) { }

  getRecruits(seachCondition: SearchCondition = null): Observable<Recruit[]> {

    // 検索条件オブジェクトがあれば条件追加
    const options = seachCondition != null ? { params: this.getAdditionalSearchParams(seachCondition) } : {};

    return this.http.get<Recruit[]>(this.endpointUrl, options);
  }

  getRecruitsByTeam(teamId: string): Observable<Recruit[]> {
    const url: string = urljoin(this.endpointUrl, 'team', teamId);

    return this.http.get<Recruit[]>(url);
  }

  searchByCanonical(canonicalModelName: string, canonicalId: string): Observable<Recruit[]> {
    const url: string = urljoin(this.endpointUrl, 'search-by-canonical', canonicalModelName, canonicalId);

    return this.http.get<Recruit[]>(url);
  }

  getRecruit(id: string): Observable<Recruit> {
    const url: string = urljoin(this.endpointUrl, id);

    return this.http.get<Recruit>(url);
  }

  /**
   * SearchConditionを元にbackに渡すためのパラメータを取得
   *
   * @param {SearchCondition} condition
   * @returns {URLSearchParams}
   * @memberof RecruitService
   */
  getAdditionalSearchParams(condition: SearchCondition): HttpParams {
    const params: HttpParams = new HttpParams();
    // 空文字列チェック
    if (condition.freeWords != null && condition.freeWords.trim().length > 0) {
      params.set('freeWords', condition.freeWords);
    }
    params.set('typeIds', condition.typeIds);
    params.set('instrumentIds', condition.instrumentIds);
    // TODO 条件を増やした場合はparamsにセットするコードを増やすこと
    return params;
  }

  createRecruit(recruit: Recruit): Observable<Recruit> {

    return this.http.post<Recruit>(this.endpointUrl, {recruit: recruit});
  }

  editRecruit(recruit: Recruit): Observable<Recruit> {
    const url: string = urljoin(this.endpointUrl, recruit.id);

    return this.http.put<Recruit>(url, {recruit: recruit});
  }



  setSearchConditionTypeIdsByTypes(searchCondition: SearchCondition, types: Type[]) {
    searchCondition.typeIds = types.map((type: Type) => {
      return type.id;
    }).toString();
  }

  setSearchConditionInstrumentIdsByInstruments(searchCondition: SearchCondition, instruments: Instrument[]) {
    searchCondition.instrumentIds = instruments.map((instrument: Instrument) => {
      return instrument.id;
    }).toString();
  }

  getTypesBySearchCondition(searchCondition: SearchCondition, typesMaster: Type[]): Type[] {
    return searchCondition.typeIds.split(',').map((typeId: string) => {
      return typesMaster.find((type: Type) => {
        return type.id.toString() === typeId;
      });
    });
  }

  getInstrumentsBySearchCondition(searchCondition: SearchCondition, instrumentsMaster: Instrument[]): Instrument[] {
    return searchCondition.instrumentIds.split(',').map((instrumentId: string) => {
      return instrumentsMaster.find((instrument: Instrument) => {
        return instrument.id.toString() === instrumentId;
      });
    });
  }
}
