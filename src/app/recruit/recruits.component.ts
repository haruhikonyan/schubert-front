import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recruit } from './recruit.model';
import { RecruitService } from './recruit.service';


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
    if (recruit.instruments === undefined)
      return [];

    return recruit.instruments
             .map(i => i.instrumentCategory.name)
             .filter((elem, idx, arr) => arr.indexOf(elem) === idx);
  }

  ngOnInit() {
    this.route.data.forEach((data: any) => {
      this.recruits = data.recruits;
    });
  }

}
