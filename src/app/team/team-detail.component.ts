import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Team } from './team.model';
import { TeamService } from './team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  team: Team;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.route.data.forEach((data: any) => {
      this.team = data.team;
    });
  }

  editTeamButtonClickHander(): void {
    // [TODO] authenticate team and route edit page if authentication is success.
  }

}
