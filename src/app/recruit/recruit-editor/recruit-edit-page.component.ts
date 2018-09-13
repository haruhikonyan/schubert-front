import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RecruitService } from './../recruit.service';
import { Recruit } from './../recruit.model';
import { ConcertService } from './../../concert/concert.service';
import { Concert } from './../../concert/concert.model';

@Component({
  selector: 'app-recruit-edit-page',
  templateUrl: './recruit-edit-page.component.html',
  styleUrls: ['./recruit-editor.component.scss']
})
export class RecruitEditPageComponent implements OnInit {

  recruit: Recruit;
  concerts: Concert[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recruitService: RecruitService,
    private concertService: ConcertService
  ) { }

  ngOnInit() {
    this.recruit = this.route.snapshot.data['recruit'];

    this.concertService.getConcertsByTeam(this.recruit.team.id)
      .map((concerts: Concert[]) => {
        this.concerts = concerts;
      })
      .subscribe();
  }

  editRecruitButtonClickHandler(): void {
    this.recruitService.editRecruit(this.recruit)
    .subscribe((recruit: Recruit) => {
      this.router.navigate(['recruits', recruit.id]);
    });
  }
}
