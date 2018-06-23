import { Inject, forwardRef } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { CanonicalRoute } from './app.model';
import { AppService } from './app.service';

export class CanonicalRoutesResolver implements Resolve<CanonicalRoute[]> {

  constructor(
    @Inject(forwardRef(() => Router)) private router: Router,
    @Inject(forwardRef(() => AppService)) private appService: AppService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CanonicalRoute[]> {
    // まだ取得していなければ取得をする
    if (this.appService.canonicalRoutes.length === 0) {
      return this.appService.getCanonicalRoutes();
    }
    else {
      return null;
    }
  }

}
