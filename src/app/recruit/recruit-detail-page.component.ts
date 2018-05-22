import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recruit } from './recruit.model';

@Component({
  selector: 'app-recruit-detail-page',
  templateUrl: './recruit-detail-page.component.html',
  styleUrls: ['./recruit-detail-page.component.scss']
})
export class RecruitDetailPageComponent implements OnInit {

  recruit: Recruit;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.recruit = this.route.snapshot.data['recruit'];
  }

}
