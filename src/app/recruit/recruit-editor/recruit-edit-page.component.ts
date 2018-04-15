import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recruit } from './../recruit.model';

@Component({
  selector: 'app-recruit-edit-page',
  templateUrl: './recruit-edit-page.component.html',
  styleUrls: ['./recruit-editor.component.scss']
})
export class RecruitEditPageComponent implements OnInit {

  recruit: Recruit;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.recruit = this.route.snapshot.data['recruit'];
  }

}
