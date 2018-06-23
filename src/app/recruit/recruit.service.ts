import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers,
         URLSearchParams, ResponseContentType } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import * as urljoin from 'url-join';

import { environment } from '../../environments/environment';
import { Instrument, Type } from './../app.model';
import { Recruit, SearchCondition } from './recruit.model';


@Injectable()
export class RecruitService {

  private apiUrl: string = environment.apiUrl;
  private endpointUrl: string = urljoin(this.apiUrl, '/recruits');

  constructor(
    private http: Http,
    private authHttp: AuthHttp
  ) { }

  getRecruits(seachCondition: SearchCondition = null): Observable<Recruit[]> {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const params: URLSearchParams = new URLSearchParams();

    // 検索条件オブジェクトがあれば条件追加
    if (seachCondition != null) {
      params.appendAll(this.getAdditionalSearchParams(seachCondition));
    }
    options.search = params;

    return this.http.get(this.endpointUrl, options)
                    .map((r: Response) => r.json() as Recruit[]);
  }

  getRecruitsByTeam(teamId: string): Observable<Recruit[]> {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const url: string = urljoin(this.endpointUrl, 'team', teamId);

    return this.authHttp.get(url, options)
                    .map((r: Response) => r.json() as Recruit[]);
  }

  searchByCanonical(canonicalModelName: string, canonicalId: string): Observable<Recruit[]> {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const url: string = urljoin(this.endpointUrl, 'search-by-canonical', canonicalModelName, canonicalId);

    return this.http.get(url, options)
                    .map((r: Response) => r.json() as Recruit[]);
  }

  getRecruit(id: string): Observable<Recruit> {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const url: string = urljoin(this.endpointUrl, id);

    return this.http.get(url, options)
                    .map((r: Response) => r.json() as Recruit);
  }

  /**
   * SearchConditionを元にbackに渡すためのパラメータを取得
   *
   * @param {SearchCondition} condition
   * @returns {URLSearchParams}
   * @memberof RecruitService
   */
  getAdditionalSearchParams(condition: SearchCondition): URLSearchParams {
    const params: URLSearchParams = new URLSearchParams();
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
    const options: RequestOptions = this.generateBasicRequestOptions();

    return this.http.post(this.endpointUrl, {recruit: recruit}, options)
                    .map((r: Response) => r.json() as Recruit);
  }

  editRecruit(recruit: Recruit): Observable<Recruit> {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const url: string = urljoin(this.endpointUrl, recruit.id);

    return this.authHttp.put(url, {recruit: recruit}, options)
                    .map((r: Response) => r.json() as Recruit);
  }

  /**
   * このサービスで利用する基本の RequestOptions を作成する
   * @return {RequestOptions}
   */
  private generateBasicRequestOptions(): RequestOptions {
    return new RequestOptions({ withCredentials: true });
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
