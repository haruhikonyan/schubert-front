import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService } from './../app.service';
import { CanonicalRoute } from './../app.model';
import { SearchCondition, Recruit } from './../recruit/recruit.model';
import { RecruitService } from './../recruit/recruit.service';
import { ConcertService } from './../concert/concert.service';
import { Concert } from './../concert/concert.model';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private recruitService: RecruitService,
    private concertService: ConcertService
  ) { }

  canonicalRoutesForTop: CanonicalRoute[];
  condition: SearchCondition = new SearchCondition();

  newRecruits: Recruit[] = [];
  hotConcerts: Concert[] = [];
  nearestConcerts: Concert[] = [];

  ngOnInit() {
    if (this.appService.canonicalRoutes.length === 0 ) {
      this.route.data.forEach((data: any) => {
        this.appService.canonicalRoutes = data.canonicalRoutes;
      });
    }
    this.canonicalRoutesForTop = this.appService.canonicalRoutes.filter((canonicalroute: CanonicalRoute) => {
      return canonicalroute.isListedOnTop;
    });

    // TODO ちゃんとしたメソッドで取得する
    this.recruitService.getRecruits()
      .subscribe((recruits: Recruit[]) => {
        this.newRecruits = recruits.slice(0, 3);
      });

    // TODO ちゃんとしたメソッドで取得する
    this.concertService.getConcerts()
      .subscribe((concerts: Concert[]) => {
        this.hotConcerts = concerts.slice(0, 3);
        this.nearestConcerts = concerts.slice(0, 3);
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
