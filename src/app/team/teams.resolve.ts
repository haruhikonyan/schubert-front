import { Inject, forwardRef } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Team } from './team.model';
import { TeamService } from './team.service';

export class TeamsResolver implements Resolve<Team[]> {

  constructor(
    @Inject(forwardRef(() => Router)) private router: Router,
    @Inject(forwardRef(() => TeamService)) private teamService: TeamService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Team[]> {
    return this.teamService.getTeams();
  }

}
