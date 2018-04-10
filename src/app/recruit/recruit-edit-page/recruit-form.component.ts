import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Recruit } from '../recruit.model';

@Component({
  selector: 'app-recruit-form',
  templateUrl: './recruit-form.component.html',
  styleUrls: ['./recruit-form.component.scss']
})
export class RecruitFormComponent implements OnInit {

  recruit: Recruit;
  constructor() { }

  ngOnInit() {
    // TODO resolve で recruit が取得できなければ Recruit を new するという処理にする
    // もしくは url 見る？
    this.recruit = new Recruit();
  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }
}
