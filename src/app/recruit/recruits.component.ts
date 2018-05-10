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

  /**
   * 団体種別の選択中のデータを返す
   *
   * @readonly
   * @type {*}
   * @memberof RecruitsComponent
   */
  get selectedTypes(): Array<{id: number, text: string}> {
    const selTypes: Array<{id: number, text: string}> = this.appService.ng2selectTypes
      .filter((data) => data.id.toString() === this.condition.typeId);

    return selTypes || [];
  }

  constructor(
    private route: ActivatedRoute,
    private recruitService: RecruitService,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.route.data.forEach((data: any) => {
      this.recruits = data.recruits;
      this.restoreSearchCondition();
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
   * 団体種別を選択した際に recruit に追加する
   * @param value
   */
  typeSelected(value: any): void {
    this.condition.typeId = this.appService.types.find((type: Type) => {
      return type.id === value.id;
    }).id.toString();
  }

  /**
   * 募集楽器を選択した際に recruit に追加する
   * @param value
   */
  instrumentSelected(value: any): void {
    this.condition.instrumentId = this.appService.instruments.find((instrument: Instrument) => {
      return instrument.id === value.id;
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

  /**
   * urlを元にSearchFiltersを復元する
   * @private
   *
   * @memberOf RecruitsComponent
   */
  private restoreSearchCondition(): void {
    // パラメータを元にconditionを作成
    const params: {[key: string]: any} = this.route.snapshot.queryParams;
    // キーワード
    this.condition.freeWord =  params['freeWord'];
    // 募集楽器
    this.condition.instrumentId = params['instrumentId'];
    // 団体種別
    this.condition.typeId = params['typeId'];
  }
}
