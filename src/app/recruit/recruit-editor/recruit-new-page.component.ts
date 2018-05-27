import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TeamService } from './../../team/team.service';
import { RecruitService } from './../recruit.service';
import { Recruit } from '../recruit.model';
import { Team } from '../../team/team.model';

@Component({
  selector: 'app-recruit-new-page',
  templateUrl: './recruit-new-page.component.html',
  styleUrls: ['./recruit-editor.component.scss']
})
export class RecruitNewPageComponent implements OnInit {

  recruit: Recruit;

  title: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recruitService: RecruitService,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.recruit = new Recruit();
    const teamId: string = this.route.snapshot.queryParams['teamId'];
    if (teamId == null) {
      this.title = '団員募集新規作成';
      this.recruit.team = new Team();
    }
    else {
      this.teamService.getTeam(teamId)
        .map((team: Team) => {
          this.recruit.team = team;
          this.title = `${this.recruit.team.name}の団員募集新規作成`;
        })
        .subscribe();
    }
  }

  createRecruitButtonClickHander(): void {
    this.recruitService.createRecruit(this.recruit)
    .subscribe((recruit: Recruit) => {
      this.router.navigate(['recruits', recruit.id]);
      // TODO teamも一緒に作成であれば同時にログイン処理をする
    });
  }

}
