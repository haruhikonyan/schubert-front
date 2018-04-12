import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Recruit } from '../recruit.model';
import { Team } from '../../team/team.model';

@Component({
  selector: 'app-recruit-form',
  templateUrl: './recruit-form.component.html',
  styleUrls: ['./recruit-form.component.scss']
})
export class RecruitFormComponent implements OnInit {

  recruit: Recruit;
  team: Team;
  constructor() { }

  ngOnInit() {
    // TODO resolve で recruit, team が取得できなければ Recruit, Team を new するという処理にする
    // もしくは url 見る？
    this.recruit = new Recruit();
    this.team = new Team();
  }

}
