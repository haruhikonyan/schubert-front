import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import * as urljoin from 'url-join';

import { environment } from '../../environments/environment';
import { LocalStorageKeyConsts } from './local-storage-key.consts';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environment.apiUrl;

  private endpointUrl: string = urljoin(this.apiUrl, '/teams');


  constructor(
    private http: Http,
    private router: Router,
    private jwtHelper: JwtHelper = new JwtHelper()
  ) { }

  /**
   * username, password でログインする
   *
   * @param {string} username
   * @param {string} password
   * @returns {Observable<Boolean>} ログイン成功したかどうか
   *
   * @memberOf AuthService
   */
  login(teamId: string, password: string): Observable<Boolean> {
    const options: RequestOptions = this.generateBasicRequestOptions();
    // TODO back から送られてくる teamId は objectId にする
    const url: string = urljoin(this.endpointUrl, teamId.toString(), '/login');

    return this.http.post(
        url,
        {password: password},
        options)
      .map((res: Response) => {
        // 200 じゃない場合は false を返して抜ける
        if (res.status !== 200) {
          return false;
        }
        // 成功した場合は token をセットする
        const data: any = res.json();
        console.log(data);
        // ログイン結果データからは、token のみを localStorage に保存
        localStorage.setItem(LocalStorageKeyConsts.ACCESS_TOKEN_ITEM_KEY, data.token);
        const currentData: any = this.getStoredTeamdata() || {};
        currentData.id = data.teamId;
        currentData.expirationDate = this.jwtHelper.getTokenExpirationDate(this.getAccessToken());
        localStorage.setItem(LocalStorageKeyConsts.STORED_TEAM_DATA_KEY, JSON.stringify(currentData));
        return true;
      });
  }

  /**
   * localStorage に保存されている、チームデータを取得する
   *
   * @private
   * @returns {any}
   *
   * @memberOf AuthService
   */
  private getStoredTeamdata(): any {
    return JSON.parse(localStorage.getItem(LocalStorageKeyConsts.STORED_TEAM_DATA_KEY));
  }

  /**
   * localStorage に保存されているアクセストークンを返す
   * angular2-jwt AuthHttp が使えないモジュール向けに用意している(EventSource など)
   *
   * @returns {string}
   *
   * @memberOf AuthService
   */
  getAccessToken(): string {
    return localStorage.getItem(LocalStorageKeyConsts.ACCESS_TOKEN_ITEM_KEY);
  }





  /**
   * このサービスで利用する基本の RequestOptions を作成する
   * @return {RequestOptions}
   */
  private generateBasicRequestOptions(): RequestOptions {
    return new RequestOptions({ withCredentials: true });
  }
}
