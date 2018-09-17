import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    private http: HttpClient,
    private authHttp: AuthHttp,
  ) { }

  getTeams(): Observable<Team[]> {

    return this.http.get<Team[]>(this.endpointUrl);
  }

  getTeam(id: string): Observable<Team> {
    const url: string = urljoin(this.endpointUrl, id);

    return this.http.get<Team>(url);
  }

  createTeam(team: Team): Observable<Team> {

    return this.http.post<Team>(this.endpointUrl, {team: team});
  }

  editTeam(team: Team): Observable<Team> {
    const url: string = urljoin(this.endpointUrl, team.id);

    return this.authHttp.put(url, {team: team})
                    .map((r) => r.json() as Team);
  }
}
