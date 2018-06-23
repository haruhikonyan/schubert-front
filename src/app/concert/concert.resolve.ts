import { Inject, forwardRef } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Concert } from './concert.model';
import { ConcertService } from './concert.service';

export class ConcertResolver implements Resolve<Concert> {

  constructor(
    @Inject(forwardRef(() => Router)) private router: Router,
    @Inject(forwardRef(() => ConcertService)) private concertService: ConcertService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Concert> {
    // パラメータを元に取得する
    const concertId: string = route.params['concertId'];
    return this.concertService.getConcert(concertId);
  }

}
