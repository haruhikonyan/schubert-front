import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recruit } from './recruit.model';
import { RecruitService } from './recruit.service';
import { Instrument, InstrumentCategory } from '../app.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-recruits',
  templateUrl: './recruits.component.html',
  styleUrls: ['./recruits.component.scss']
})
export class RecruitsComponent implements OnInit {

  recruits: Recruit[] = [];

  constructor(
    private route: ActivatedRoute,
    private recruitService: RecruitService,
    private appService: AppService
  ) { }

  // recruit のカテゴリ一覧を取得する
  getCategoriesOfRecruitInstrument(recruit: Recruit) {
    if (recruit.instruments === undefined) {
      return [];
    }

    return this.appService.instrumentCategories.filter((ic: InstrumentCategory) =>
      recruit.instruments
        .map((i: Instrument) => i.instrumentCategory)
        .find((icRecruit: Instrument) => icRecruit.id === ic.id)
    );
  }

  ngOnInit() {
    this.route.data.forEach((data: any) => {
      this.recruits = data.recruits;
    });
  }

}
