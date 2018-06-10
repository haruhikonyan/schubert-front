import { CanonicalRoute } from './../app.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService } from './../app.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private appService: AppService
  ) { }

  canonicalRoutesForTop: CanonicalRoute[];

  ngOnInit() {
    if (this.appService.canonicalRoutes.length === 0 ) {
      this.route.data.forEach((data: any) => {
        this.appService.canonicalRoutes = data.canonicalRoutes;
      });
    }
    this.canonicalRoutesForTop = this.appService.canonicalRoutes.filter((canonicalroute: CanonicalRoute) => {
      return canonicalroute.isListedOnTop;
    });
  }

}
