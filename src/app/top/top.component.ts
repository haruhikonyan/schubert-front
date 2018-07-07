import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService } from './../app.service';
import { CanonicalRoute } from './../app.model';
import { SearchCondition } from './../recruit/recruit.model';
import { RecruitService } from './../recruit/recruit.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private recruitService: RecruitService
  ) { }

  canonicalRoutesForTop: CanonicalRoute[];
  condition: SearchCondition = new SearchCondition();

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
  /**
   * 団員募集検索ボタンクリックハンドラ
   *
   * @memberof RecruitsComponent
   */
  searchRecruitBtnClickHandler(): void {
    console.log(this.condition.freeWords);
    // TODO 実装
  }
  /**
   * 演奏会検索ボタンクリックハンドラ
   *
   * @memberof RecruitsComponent
   */
  searchConcertBtnClickHandler(): void {
    console.log(this.condition.freeWords);
    // TODO 実装
  }
}
