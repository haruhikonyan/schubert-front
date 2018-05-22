import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Team } from './../team.model';
import { TeamService } from './../team.service';

@Component({
  selector: 'app-team-new-page',
  templateUrl: './team-new-page.component.html',
  styleUrls: ['./team-new-page.component.scss']
})
export class TeamNewPageComponent implements OnInit {

  team: Team;
  constructor(
    private teamService: TeamService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.team = new Team();
  }

  createTeamButtonClickHander(): void {
    this.teamService.createTeam(this.team)
      .subscribe((team: Team) => {
        this.router.navigate(['teams', team.id]);
        // TODO 同時にログイン処理をする
      });
  }

}
