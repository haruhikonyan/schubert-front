import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RecruitService } from './../recruit.service';
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
    private router: Router,
    private recruitService: RecruitService,
  ) { }

  ngOnInit() {
    this.recruit = this.route.snapshot.data['recruit'];
  }

  editRecruitButtonClickHander(): void {
    this.recruitService.editRecruit(this.recruit)
    .subscribe((recruit: Recruit) => {
      this.router.navigate(['recruits', recruit.id]);
    });
  }
}
