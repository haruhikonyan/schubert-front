import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AppService } from './../../app.service';
import { Recruit } from '../recruit.model';
import { Instrument } from '../../app.model';
import { ConcertService } from './../../concert/concert.service';
import { Concert } from '../../concert/concert.model';

@Component({
  selector: 'app-recruit-form',
  templateUrl: './recruit-form.component.html',
  styleUrls: ['./recruit-form.component.scss']
})
export class RecruitFormComponent implements OnInit {

  @Input()
  recruit: Recruit;

  @Input()
  concerts: Concert[] = [];
  constructor(
    private route: ActivatedRoute,
    public appService: AppService
  ) { }

  ngOnInit() {
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
