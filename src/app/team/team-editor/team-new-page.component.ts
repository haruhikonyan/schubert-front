import { Component, OnInit } from '@angular/core';

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
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.team = new Team();
  }

  createTeamButtonClickHander(): void {
    this.teamService.createTeam(this.team)
      .subscribe();
  }

}
