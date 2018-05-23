import { Component, OnInit, Input } from '@angular/core';

import { Instrument } from '../app.model';

@Component({
  selector: 'app-instrument',
  templateUrl: './instrument.component.html',
  // styleUrls: ['./instrument.component.scss']
})
export class InstrumentComponent implements OnInit {

  // recruit情報に含まれるinstrumentsをCategory別に分けた時のCategory名のリスト
  get retainCategories(): string[] {
    return Object.keys(this.instrumentsGroupByCategory);
  }

  // 募集楽器のリスト
  @Input()
  instruments: Instrument[];

  // 募集楽器をカテゴリgroupingしたデータ
  instrumentsGroupByCategory: any = {};

  constructor(
  ) {
  }

  ngOnInit() {
    // カテゴリ別に募集楽器をグルーピングする
    this.instruments.forEach((val: Instrument, index: number, array: Instrument[]) => {
      const datas: string[] = this.instrumentsGroupByCategory[val.instrumentCategory.name] || [];
      this.instrumentsGroupByCategory[val.instrumentCategory.name] = datas.concat(val.name);
    });
  }



}
