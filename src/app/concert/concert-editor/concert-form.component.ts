import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Concert, Hole, Conductor } from './../concert.model';
import { AppService } from './../../app.service';

@Component({
  selector: 'app-concert-form',
  templateUrl: './concert-form.component.html',
  styleUrls: ['./concert-form.component.scss']
})
export class ConcertFormComponent implements OnInit {

  @Input()
  concert: Concert;

  constructor(
    public appService: AppService,
  ) { }

  ngOnInit() {
  }

  /**
   * selectタグのデータ比較を行う
   *
   * @param {any} t1
   * @param {any} t2
   * @returns {boolean}
   * @memberof ConcertFormComponent
   */
  compareFunc(data1: any, data2: any): boolean {
    return data1 && data2 ? data1.id === data2.id : data1 === data2;
}

  /**
  * 開催日変更イベントハンドラ
  * 開場、開演データの日時を合わせる
  */
  dateChangeHandler(value: Date) {
    // TODO 開催日の日付をベースに開場、開演データに設定されている時刻をセットしてやる
    const baseDate: Date = new Date(value);
    this.concert.cirtainTime = new Date(baseDate.setHours(this.concert.cirtainTime.getHours(), this.concert.cirtainTime.getMinutes()));
    this.concert.doorsOpen = new Date(baseDate.setHours(this.concert.doorsOpen.getHours(), this.concert.doorsOpen.getMinutes()));
  }


  conductorSelectHandler(conductorId: string, index: number) {
    this.concert.conductors[index] = this.appService.conductors.find(c => c.id === Number(conductorId));
  }

  addConductorHandler() {
    this.concert.conductors.push(new Conductor());
  }
}
