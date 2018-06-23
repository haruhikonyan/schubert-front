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
    if (this.condition.typeIds == null) {
      return [];
    }
    return this.condition.typeIds.split(',').map((typeId: string) => {
      return this.appService.ng2selectTypes.find((t: {id: number, text: string}) => {
        return t.id.toString() === typeId;
      });
    });
}

  /**
   * 募集楽器の選択中のデータを返す
   *
   * @readonly
   * @type {*}
   * @memberof RecruitsComponent
   */
  get selectedInstruments(): Array<{id: number, text: string}> {
    if (this.condition.instrumentIds == null) {
      return [];
    }
    return this.condition.instrumentIds.split(',').map((instrumentId: string) => {
      return this.appService.ng2selectInstruments.find((i: {id: number, text: string}) => {
        return i.id.toString() === instrumentId;
      });
    });
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
   * 団体種別を選択した際に condition.typeIds に追加する
   * @param value
   */
  typeSelectHandler(id: number): void {
    const selectValue = id.toString();
    const typeIdList: string[] = this.condition.typeIds == null ? [] : this.condition.typeIds.split(',');
    this.condition.typeIds = typeIdList.concat(selectValue).toString();
  }

  typeRemoveHandler(id: number): void {
    const removeValue = id.toString();
    let typeIdList: string[] = this.condition.typeIds == null ? [] : this.condition.typeIds.split(',');

    typeIdList = typeIdList.filter((i: string) => {
      return i !== removeValue;
    });
    this.condition.typeIds = typeIdList.length === 0 ? null : typeIdList.toString();
  }


  /**
   * 募集楽器を選択した際に condition.instrumentIds に追加する
   * @param value
   */
  instrumentSelectHandler(id: number): void {
    const selectValue = id.toString();
    const instrumentIdList: string[] = this.condition.instrumentIds == null ? [] : this.condition.instrumentIds.split(',');
    this.condition.instrumentIds = instrumentIdList.concat(selectValue).toString();
  }

  instrumentRemoveHandler(id: number): void {
    const removeValue = id.toString();
    let instrumentIdList: string[] = this.condition.instrumentIds == null ? [] : this.condition.instrumentIds.split(',');

    instrumentIdList = instrumentIdList.filter((i: string) => {
      return i !== removeValue;
    });
    this.condition.instrumentIds = instrumentIdList.length === 0 ? null : instrumentIdList.toString();
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
