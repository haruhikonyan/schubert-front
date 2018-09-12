import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Concert, Conductor, Repertoire, Tune } from './../concert.model';
import { ConcertService } from './../concert.service';
import { TeamService } from './../../team/team.service';
import { Team } from '../../team/team.model';

@Component({
  selector: 'app-concert-new-page',
  templateUrl: './concert-new-page.component.html',
  styleUrls: ['./concert-editor.component.scss']
})
export class ConcertNewPageComponent implements OnInit {

  concert: Concert;

  title: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private concertService: ConcertService,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.concert = new Concert();
    const teamId: string = this.route.snapshot.queryParams['teamId'];
    if (teamId == null) {
      this.title = '演奏会宣伝新規作成';
      this.concert.team = new Team();
    }
    else {
      this.teamService.getTeam(teamId)
        .map((team: Team) => {
          this.concert.team = team;
          this.title = `${this.concert.team.name}の演奏会宣伝新規作成`;
        })
        .subscribe();
    }
  }

  createConcertButtonClickHander(): void {
    this.concertService.createConcert(this.concert)
      .subscribe((concert: Concert) => {
        this.router.navigate(['concerts', concert.id]);
        // TODO teamも一緒に作成であれば同時にログイン処理をする
      });
  }

}
