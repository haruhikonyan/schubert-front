import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recruit } from './recruit.model';
import { Instrument } from '../app.model';

@Component({
  selector: 'app-recruit-detail-page',
  templateUrl: './recruit-detail-page.component.html',
  styleUrls: ['./recruit-detail-page.component.scss']
})
export class RecruitDetailPageComponent implements OnInit {

  // htmlでobjectをkeyで分解するために定義
  objectKeys = Object.keys;

  recruit: Recruit;
  instrumentsGroupByCategory: any = {};

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.recruit = this.route.snapshot.data['recruit'];
    // 募集楽器をCategoryでgrouping
    this.recruit.instruments.forEach((val: Instrument, index: number, array: Instrument[]) => {
      const datas: string[] = this.instrumentsGroupByCategory[val.instrumentCategory.name] || [];
      this.instrumentsGroupByCategory[val.instrumentCategory.name] = datas.concat(val.name);
    });
  }



}
