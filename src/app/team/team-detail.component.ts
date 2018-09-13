import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  isLoggedIn: boolean;

  /**
   * ログインに失敗したときに true になりエラーメッセージを表示する
   */
  canShowflushMessage: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.data.forEach((data: any) => {
      this.team = data.team;
    });
    this.isLoggedIn = this.authService.isLoggedInByTeamId(this.team.id);
  }

  moveAdminTeamButtonClickHandler(): void {
    // エラー表示を消す
    this.canShowflushMessage = false;
    if (this.isLoggedIn) {
      this.router.navigate(['teams', this.team.id, 'admin']);
    }
    else {
      // 別 team でログイン中の場合もあるので一旦ログアウトさせる
      this.authService.logout();

      this.authService.login(this.team.id, this.password)
      .subscribe((isLoginSuccessful: boolean) => {
          if (isLoginSuccessful) {
            this.router.navigate(['teams', this.team.id, 'admin']);
          }
        },
        (error: Error) => {
          this.canShowflushMessage = true;
        });
    }
  }

}
