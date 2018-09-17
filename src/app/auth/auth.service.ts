import { Team } from './../team/team.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import * as urljoin from 'url-join';

import { environment } from '../../environments/environment';
import { LocalStorageKeyConsts } from './local-storage-key.consts';

interface LoginResponse {
  team: Team;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environment.apiUrl;

  private endpointUrl: string = urljoin(this.apiUrl, '/teams');


  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelper = new JwtHelper()
  ) { }

  login(teamId: string, password: string): Observable<Boolean> {
    const url: string = urljoin(this.endpointUrl, teamId.toString(), '/login');

    return this.http.post<LoginResponse>(url, {password: password})
      .map((loginResponse: LoginResponse) => {
        // TODO ステータスコードを見てハンドリングするようにする
        // token が帰ってこない場合は false を返して抜ける
        if (loginResponse.token == null) {
          return false;
        }
        // ログイン結果データからは、token のみを localStorage に保存
        localStorage.setItem(LocalStorageKeyConsts.ACCESS_TOKEN_ITEM_KEY, loginResponse.token);
        const currentData: any = this.getStoredTeamData() || {};
        currentData.teamId = loginResponse.team.id;
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
  private getStoredTeamData(): any {
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
   * ログイン中かどうかを返す
   *
   * @returns {boolean}
   *
   * @memberOf AuthService
   */
  isLoggedInByTeamId(id: string): boolean {
    const data: any = this.getStoredTeamData();
    return tokenNotExpired() && data.teamId === id;
  }

  logout(): void {
    localStorage.removeItem(LocalStorageKeyConsts.STORED_TEAM_DATA_KEY);
    localStorage.removeItem(LocalStorageKeyConsts.ACCESS_TOKEN_ITEM_KEY);
  }
}
