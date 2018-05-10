import { Inject, forwardRef } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Recruit } from './recruit.model';
import { RecruitService } from './recruit.service';

export class RecruitResolver implements Resolve<Recruit> {

  constructor(
    @Inject(forwardRef(() => Router)) private router: Router,
    @Inject(forwardRef(() => RecruitService)) private recruitService: RecruitService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recruit> {
    // get params from route
    const recruitId = route.params['recruitId'];

    return this.recruitService.getRecruit(recruitId);
  }

}
