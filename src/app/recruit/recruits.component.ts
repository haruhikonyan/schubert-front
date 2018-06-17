import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

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
    // TODO multiに対応。その際filter内の比較部分が変わるはず
    const selTypes: Array<{id: number, text: string}> = this.appService.ng2selectTypes
      .filter((data) => data.id.toString() === this.condition.typeIds);

    return selTypes || [];
  }

  /**
   * 募集楽器の選択中のデータを返す
   *
   * @readonly
   * @type {*}
   * @memberof RecruitsComponent
   */
  get selectedInstruments(): Array<{id: number, text: string}> {
    // TODO multiに対応。その際filter内の比較部分が変わるはず
    const selInstruments: Array<{id: number, text: string}> = this.appService.ng2selectInstruments
      .filter((data) => data.id.toString() === this.condition.instrumentIds);

    return selInstruments || [];
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recruitService: RecruitService,
    public appService: AppService
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
  typeSelectHandler(value: any): void {
    this.condition.typeIds = this.appService.types.find((type: Type) => {
      return type.id === value.id;
    }).id.toString();
  }

  /**
   * 募集楽器を選択した際に recruit に追加する
   * @param value
   */
  instrumentSelectHandler(value: any): void {
    this.condition.instrumentIds = this.appService.instruments.find((instrument: Instrument) => {
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
        // url書き換え
        this.updateUrl();
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
    this.condition.freeWords =  params['freeWords'];
    // 募集楽器
    this.condition.instrumentIds = params['instrumentIds'];
    // 団体種別
    this.condition.typeIds = params['typeIds'];
  }

  /**
   * 検索条件オブジェクト（searchFilters）を元にurlをアップデートする
   *
   * @private
   *
   * @memberOf RecruitsComponent
   */
  private updateUrl(): void {
    // queryParamsを生成する(URL書き換え用)
    const qPs = {};

    // conditionを元にqueryParamsを追加(ページのURLのためでback用ではない)
    Object.keys(this.condition).forEach((key: string) => {
      let value = this.condition[key];

      // 全文検索クエリの場合は空文字列チェック
      if (key === 'freeWords') {
        if (value != null && value.trim().length > 0) {
          value = value.trim();
        }
        else {
          value = undefined;
        }
      }

      qPs[key] = value;
    });

    const navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      queryParams: qPs,
    };
      // url 書き換え
    this.router.navigate(['.'], navigationExtras);
  }
}
