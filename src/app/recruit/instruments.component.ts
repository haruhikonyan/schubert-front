import { Component, OnInit, Input } from '@angular/core';

import { Instrument } from '../app.model';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  // styleUrls: ['./instruments.component.scss']
})
export class InstrumentsComponent implements OnInit {

  // recruit情報に含まれるinstrumentsをCategory別に分けた時のCategory名のリスト
  get retainCategories(): string[] {
    return Object.keys(this.instrumentsGroupByCategory);
  }

  // 募集楽器のリスト
  @Input()
  instruments: Instrument[];
  @Input()
  displayShortName: boolean = false;

  // 募集楽器をカテゴリgroupingしたデータ
  instrumentsGroupByCategory: any = {};

  constructor(
  ) {
  }

  ngOnInit() {
    // カテゴリ別に募集楽器をグルーピングする
    // 楽器名を短縮表示させる場合は displayShortName を true にする。（default は false）
    this.instruments.forEach((val: Instrument, index: number, array: Instrument[]) => {
      const data: string[] = this.instrumentsGroupByCategory[val.instrumentCategory.name] || [];
      const instrumentName = (this.displayShortName ? val.shortName : val.name);
      this.instrumentsGroupByCategory[val.instrumentCategory.name] = data.concat(instrumentName);
    });
  }



}
