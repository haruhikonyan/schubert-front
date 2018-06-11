import { Inject, forwardRef } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Recruit, SearchCondition } from './recruit.model';
import { RecruitService } from './recruit.service';

export class RecruitsCanonicalSearchResolver implements Resolve<Recruit[]> {

  constructor(
    @Inject(forwardRef(() => Router)) private router: Router,
    @Inject(forwardRef(() => RecruitService)) private recruitService: RecruitService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recruit[]> {
    const canonicalModelName: string = route.params['canonicalModelName'];
    const canonicalId: string = route.params['canonicalId'];

    return this.recruitService.searchByCanonical(canonicalModelName, canonicalId);
  }
}
