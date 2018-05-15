import { Inject, forwardRef } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Recruit, SearchCondition } from './recruit.model';
import { RecruitService } from './recruit.service';

export class RecruitsResolver implements Resolve<Recruit[]> {

  constructor(
    @Inject(forwardRef(() => Router)) private router: Router,
    @Inject(forwardRef(() => RecruitService)) private recruitService: RecruitService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recruit[]> {
    // パラメータを元にcondition作成
    const condition: SearchCondition = new SearchCondition();
    condition.typeIds = route.queryParams['typeIds'];
    condition.instrumentIds = route.queryParams['instrumentIds'];
    condition.freeWord = route.queryParams['freeWord'];

    return this.recruitService.getRecruits(condition);
  }

}
