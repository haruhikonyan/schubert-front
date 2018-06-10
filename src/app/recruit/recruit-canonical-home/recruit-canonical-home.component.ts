import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { AppService } from './../../app.service';
import { CanonicalRoute } from './../../app.model';

@Component({
  selector: 'app-recruit-canonical-home',
  templateUrl: './recruit-canonical-home.component.html',
  styleUrls: ['./recruit-canonical-home.component.scss']
})
export class RecruitCanonicalHomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private appService: AppService
  ) { }

  canonicalRoutesForModel: CanonicalRoute[];

  ngOnInit() {
    if (this.appService.canonicalRoutes.length === 0 ) {
      this.route.data.forEach((data: any) => {
        this.appService.canonicalRoutes = data.canonicalRoutes;
      });
    }
    this.canonicalRoutesForModel = this.appService.canonicalRoutes.filter((canonicalroute: CanonicalRoute) => {
      return canonicalroute.canonicalModelName === this.route.snapshot.params['canonicalModelName'];
    });
  }

}
