import { Component, OnInit } from '@angular/core';

import { Team } from './team.model';
import { TeamService } from './team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  teams: Team[] = [];

  constructor(
    private teamService: TeamService
  ) { }

  ngOnInit() {
    // TODO resolve にする
    this.teamService.getTeams()
      .map((teams: Team[]) => {
        this.teams = teams;
      })
      .subscribe();
  }

}
