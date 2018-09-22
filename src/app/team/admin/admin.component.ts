import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TeamService } from './../../team/team.service';
import { Team } from '../../team/team.model';
import { RecruitService } from './../../recruit/recruit.service';
import { Recruit } from './../../recruit/recruit.model';
import { ConcertService } from './../../concert/concert.service';
import { Concert } from './../../concert/concert.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  team: Team;
  recruits: Recruit[];
  concerts: Concert[];

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private recruitService: RecruitService,
    private concertService: ConcertService,
  ) { }


  ngOnInit() {
    const teamId = this.route.snapshot.params.teamId;
    this.teamService.getTeam(teamId)
      .subscribe((team: Team) => {
        this.team = team;
      });

    this.recruitService.getRecruitsByTeam(teamId)
      .subscribe((recruits: Recruit[]) => {
        this.recruits = recruits;
      });

    this.concertService.getConcertsByTeam(teamId)
      .subscribe((concerts: Concert[]) => {
        this.concerts = concerts;
      });

  }
}
