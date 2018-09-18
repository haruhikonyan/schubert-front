import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import * as urljoin from 'url-join';

import { environment } from '../../environments/environment';
import { Team } from './team.model';

@Injectable()
export class TeamService {

  private apiUrl: string = environment.apiUrl;
  private endpointUrl: string = urljoin(this.apiUrl, '/teams');

  constructor(
    private http: HttpClient
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

    return this.http.put<Team>(url, {team: team});
  }
}
