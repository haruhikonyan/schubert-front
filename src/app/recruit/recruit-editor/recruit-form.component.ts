import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AppService } from './../../app.service';
import { Recruit } from '../recruit.model';
import { Team } from '../../team/team.model';
import { Type, Instrument, Region } from '../../app.model';

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
    this.recruit.team.types = this.recruit.team.types.filter((type: Type) => {
      return type.id !== value.id;
    });
  }

  /**
   * TODO 別コンポーネントに分ける
   * 活動地域を選択した際に team に追加する
   * @param value
   */
  regionSelected(value: any): void {
    const selectedType = this.appService.regions.find((region: Region) => {
      return region.id === value.id;
    });
    this.recruit.team.regions.push(selectedType);
  }

  /**
   * TODO 別コンポーネントに分ける
   * 活動地域を選択した際に team から削除する
   * @param value
   */
  regionRemoved(value: any): void {
    this.recruit.team.regions = this.recruit.team.regions.filter((region: Region) => {
      return region.id !== value.id;
    });
  }

  /**
   * 募集楽器を選択した際に recruit に追加する
   * @param value
   */
  instrumentSelected(value: any): void {
    const selectedType = this.appService.instruments.find((instrument: Instrument) => {
      return instrument.id === value.id;
    });
    this.recruit.instruments.push(selectedType);
  }

  /**
   * 募集楽器を選択した際に recruit から削除する
   * @param value
   */
  instrumentRemoved(value: any): void {
    this.recruit.instruments = this.recruit.instruments.filter((instrument: Instrument) => {
      return instrument.id !== value.id;
    });
  }
}
