import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recruit } from './recruit.model';
import { RecruitService } from './recruit.service';
import { Instrument, InstrumentCategory } from '../app.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-recruits',
  templateUrl: './recruits.component.html',
  styleUrls: ['./recruits.component.scss']
})
export class RecruitsComponent implements OnInit {

  types: any = [
    {name: 'オーケストラ', value: 1},
    {name: '吹奏楽', value: 2},
    {name: 'アンサンブル', value: 3},
    {name: '合唱', value: 4},
    {name: '大編成', value: 5},
    {name: 'サブカル系', value: 6},
  ];
  recruits: Recruit[] = [];
  filteredRecruits: Recruit[] = [];

  selectedType: string;

  constructor(
    private route: ActivatedRoute,
    private recruitService: RecruitService,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.route.data.forEach((data: any) => {
      this.recruits = data.recruits;
      this.filteredRecruits = data.recruits;
    });
  }

  // TODO recruit-card.component へ移植予定
  // instruments から 指定の category のものだけ取り出す
  filteredInsturmentsByCategory(instruments: Instrument[], ic: InstrumentCategory): Instrument[] {
    return instruments.filter((instrument: Instrument) => {
      return instrument.instrumentCategory.id === ic.id;
    });
  }

  searchBtnClickHandler(): void {
    // 未選択状態ならfilter解除
    if (this.selectedType === '') {
      this.filteredRecruits = this.recruits;
      return;
    }

    this.filteredRecruits = this.recruits.filter((recruit: Recruit) => {
      return recruit.team.types.map((x) => x.id).includes(+this.selectedType);
    });
  }
}
