import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { TeamService } from './../../team/team.service';
import { Team } from '../../team/team.model';
import { RecruitService } from './../../recruit/recruit.service';
import { Recruit } from './../../recruit/recruit.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  team: Team;
  recruits: Recruit[];

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private recruitService: RecruitService,
  ) { }


  ngOnInit() {
    const teamId = this.route.snapshot.params.teamId;
    this.teamService.getTeam(teamId)
      .map((team: Team) => {
        this.team = team;
      })
      .subscribe();

    this.recruitService.getRecruitsByTeam(teamId)
      .map((recruits: Recruit[]) => {
        this.recruits = recruits;
      })
      .subscribe();

  }
}
