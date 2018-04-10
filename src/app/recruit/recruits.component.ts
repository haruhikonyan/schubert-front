import { Component, OnInit } from '@angular/core';

import { Recruit } from './recruit.model';
import { RecruitService } from './recruit.service';


@Component({
  selector: 'app-recruits',
  templateUrl: './recruits.component.html',
  styleUrls: ['./recruits.component.scss']
})
export class RecruitsComponent implements OnInit {

  recruits: Recruit[] = [];

  constructor(
    private recruitService: RecruitService
  ) { }

  ngOnInit() {
    // TODO resolve にする
    this.recruitService.getRecruits()
      .map((recruits: Recruit[]) => {
        this.recruits = recruits;
      })
      .subscribe();
  }

}
