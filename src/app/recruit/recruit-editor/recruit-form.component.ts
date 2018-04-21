import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AppService } from './../../app.service';
import { Recruit } from '../recruit.model';
import { Team } from '../../team/team.model';
import { Type } from '../../app.model';

@Component({
  selector: 'app-recruit-form',
  templateUrl: './recruit-form.component.html',
  styleUrls: ['./recruit-form.component.scss']
})
export class RecruitFormComponent implements OnInit {

  @Input()
  recruit: Recruit;
  constructor(
    public appService: AppService
  ) { }

  ngOnInit() {
  }

  /**
   * TODO 別コンポーネントに分ける
   * 団体種別を選択した際に team に追加する
   * @param value
   */
  typeSelected(value: any): void {
    const selectedType = this.appService.types.find((type: Type) => {
      return type.id === value.id;
    });
    this.recruit.team.types.push(selectedType);
  }

  /**
   * TODO 別コンポーネントに分ける
   * 団体種別を選択した際に team から削除する
   * @param value
   */
  typeRemoved(value: any): void {
    this.recruit.team.types = this.appService.types.filter((type: Type) => {
      return type.id !== value.id;
    });
  }
}
