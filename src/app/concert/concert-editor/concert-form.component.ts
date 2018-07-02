import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Concert } from './../concert.model';
import { Team } from '../../team/team.model';
import { AppService } from './../../app.service';
import { TeamService } from '../../team/team.service';

@Component({
  selector: 'app-concert-form',
  templateUrl: './concert-form.component.html',
  styleUrls: ['./concert-form.component.scss']
})
export class ConcertFormComponent implements OnInit {

  @Input()
  concert: Concert;

  teams: Team[];

  constructor(
    public appService: AppService,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.teamService.getTeams()
      .map((teams: Team[]) => {
        this.teams = teams;
      })
      .subscribe();
  }

  /**
   * selectタグのデータ比較を行う
   *
   * @param {Team} t1
   * @param {Team} t2
   * @returns {boolean}
   * @memberof ConcertFormComponent
   */
  compareFunc(t1: Team, t2: Team): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
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

}
