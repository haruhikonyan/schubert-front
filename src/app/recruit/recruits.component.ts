import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recruit } from './recruit.model';
import { RecruitService } from './recruit.service';
import { Instrument, InstrumentCategory } from '../app.model';

@Component({
  selector: 'app-recruits',
  templateUrl: './recruits.component.html',
  styleUrls: ['./recruits.component.scss']
})
export class RecruitsComponent implements OnInit {

  recruits: Recruit[] = [];

  constructor(
    private route: ActivatedRoute,
    private recruitService: RecruitService
  ) { }

  // recruit のカテゴリ一覧を取得する
  getCategoriesOfRecruitInstrument(recruit: Recruit) {
    if (recruit.instruments === undefined) {
      return [];
    }

    const categories: String[] = [];
    recruit.instruments.forEach((i: Instrument) => {
      if (!categories.includes(i.instrumentCategory.name)) {
        categories.push(i.instrumentCategory.name);
      }
    });
    return categories.sort();
  }

  ngOnInit() {
    this.route.data.forEach((data: any) => {
      this.recruits = data.recruits;
    });
  }

}
