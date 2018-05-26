import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { TeamService } from './../../team/team.service';
import { Team } from '../../team/team.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  team: Team;

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit() {
    const teamId = this.route.snapshot.params.teamId;
    this.teamService.getTeam(teamId)
      .map((team: Team) => {
        this.team = team;
      })
      .subscribe();
  }
}
