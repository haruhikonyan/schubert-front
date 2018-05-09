import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recruit, SearchCondition } from './recruit.model';
import { RecruitService } from './recruit.service';
import { Instrument, InstrumentCategory } from '../app.model';
import { AppService } from '../app.service';
import { Type } from './../app.model';

@Component({
  selector: 'app-recruits',
  templateUrl: './recruits.component.html',
  styleUrls: ['./recruits.component.scss']
})
export class RecruitsComponent implements OnInit {

  recruits: Recruit[] = [];

  condition: SearchCondition = new SearchCondition();

  constructor(
    private route: ActivatedRoute,
    private recruitService: RecruitService,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.route.data.forEach((data: any) => {
      this.recruits = data.recruits;
    });
  }

  // TODO recruit-card.component へ移植予定
  // instruments から 指定の category のものだけ取り出す
  filteredInsturmentsByCategory(instruments: Instrument[], ic: InstrumentCategory): Instrument[] {
    return instruments.filter((instrument: Instrument) => {
      return instrument.instrumentCategory.id === ic.id;
    });
  }

  /**
   * 募集楽器を選択した際に recruit に追加する
   * @param value
   */
  typeSelected(value: any): void {
    this.condition.typeId = this.appService.types.find((type: Type) => {
      return type.id === value.id;
    }).id.toString();
  }

  /**
   * 検索ボタンクリックハンドラ
   *
   * @memberof RecruitsComponent
   */
  searchBtnClickHandler(): void {
    this.recruitService.getRecruits(this.condition)
      .map((recruits: Recruit[]) => {
        this.recruits = recruits;
      })
      .subscribe();
  }
}
