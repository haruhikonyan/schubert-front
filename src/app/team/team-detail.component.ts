import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Team } from './team.model';
import { TeamService } from './team.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-team',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  team: Team;
  password: string;

  /**
   * ログインに失敗したときに true になりエラーメッセージを表示する
   */
  canShowflushMessage: boolean;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.data.forEach((data: any) => {
      this.team = data.team;
    });
  }

  editTeamButtonClickHander(): void {
    // エラー表示を消す
    this.canShowflushMessage = false;

    this.authService.login(this.team.id, this.password)
    .subscribe((isLoginSuccessful: boolean) => {
        if (isLoginSuccessful) {
          console.log('ログイン成功');
        }
      },
      (error: Error) => {
        this.canShowflushMessage = true;
      });
  }

}
