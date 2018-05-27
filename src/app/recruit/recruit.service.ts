import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers,
         URLSearchParams, ResponseContentType } from '@angular/http';

import { Observable } from 'rxjs';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import * as urljoin from 'url-join';

import { environment } from '../../environments/environment';
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
    if (condition.freeWord != null && condition.freeWord.trim().length > 0) {
      params.set('freeWord', condition.freeWord);
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
    // TODO backから送られてくるidがstringになったら toString() を外す
    const url: string = urljoin(this.endpointUrl, recruit.id.toString());

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

}
