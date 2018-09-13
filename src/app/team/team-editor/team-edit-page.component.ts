import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TeamService } from './../team.service';
import { Team } from './../team.model';

@Component({
  selector: 'app-team-edit-page',
  templateUrl: './team-edit-page.component.html',
  styleUrls: ['./team-edit-page.component.scss']
})
export class TeamEditPageComponent implements OnInit {

  team: Team;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService,
  ) { }

  ngOnInit() {
    this.team = this.route.snapshot.data['team'];
  }

  editTeamButtonClickHandler(): void {
    this.teamService.editTeam(this.team)
    .subscribe((team: Team) => {
      this.router.navigate(['teams', team.id, 'admin']);
    });
  }

}
