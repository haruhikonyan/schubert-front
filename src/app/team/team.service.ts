import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers,
  URLSearchParams, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import * as urljoin from 'url-join';

import { environment } from '../../environments/environment';
import { Team } from './team.model';

@Injectable()
export class TeamService {

  private apiUrl: string = environment.apiUrl;
  private endpointUrl: string = urljoin(this.apiUrl, '/teams');

  constructor(
    private http: Http,
    private authHttp: AuthHttp,
  ) { }

  getTeams(): Observable<Team[]> {
    const options: RequestOptions = this.generateBasicRequestOptions();

    return this.http.get(this.endpointUrl, options)
                    .map((r: Response) => r.json() as Team[]);
  }

  getTeam(id: string): Observable<Team> {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const url: string = urljoin(this.endpointUrl, id);

    return this.http.get(url, options)
                    .map((r: Response) => r.json() as Team);
  }

  createTeam(team: Team): Observable<Team> {
    const options: RequestOptions = this.generateBasicRequestOptions();

    return this.http.post(this.endpointUrl, {team: team}, options)
                    .map((r: Response) => r.json() as Team);
  }

  editTeam(team: Team): Observable<Team> {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const url: string = urljoin(this.endpointUrl, team.id);

    return this.authHttp.put(url, {team: team}, options)
                    .map((r: Response) => r.json() as Team);
  }


  /**
   * このサービスで利用する基本の RequestOptions を作成する
   * @return {RequestOptions}
   */
  private generateBasicRequestOptions(): RequestOptions {
    return new RequestOptions({ withCredentials: true });
  }
}
