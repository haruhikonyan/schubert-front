import { Inject, forwardRef } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Team } from './team.model';
import { TeamService } from './team.service';

export class TeamResolver implements Resolve<Team> {

  constructor(
    @Inject(forwardRef(() => Router)) private router: Router,
    @Inject(forwardRef(() => TeamService)) private teamService: TeamService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Team> {
    // get params from route
    const teamId = route.params['teamId'];

    return this.teamService.getTeam(teamId);
  }

}
