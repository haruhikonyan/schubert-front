import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AppService } from './../../app.service';
import { Concert } from './../concert.model';

@Component({
  selector: 'app-concert-form',
  templateUrl: './concert-form.component.html',
  styleUrls: ['./concert-form.component.scss']
})
export class ConcertFormComponent implements OnInit {

  @Input()
  concert: Concert;
  constructor(
    public appService: AppService
  ) { }

  ngOnInit() {

  }

  /**
  * 開催日変更イベントハンドラ
  * 開場、開演データの日時を合わせる
  */
  dateChangeHandler(value: Date) {
    // TODO 開催日の日付をベースに開場、開演データに設定されている時刻をセットしてやる
    const baseDate: Date = new Date(value);
    this.concert.cirtainTime = value; // new Date(baseDate.setHours(this.concert.cirtainTime.getHours()));
    this.concert.doorsOpen = value; // new Date(baseDate.setHours(this.concert.doorsOpen.getHours()));
  }

}
