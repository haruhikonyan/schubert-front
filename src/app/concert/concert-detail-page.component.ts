import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConcertService } from './concert.service';
import { Concert } from './concert.model';

@Component({
  selector: 'app-concert-detail',
  templateUrl: './concert-detail-page.component.html',
  styleUrls: ['./concert-detail-page.component.scss']
})
export class ConcertDetailPageComponent implements OnInit {

  concert: Concert;

  password: string;
  isLoggedIn: boolean;

  /**
   * ログインに失敗したときに true になりエラーメッセージを表示する
   */
  canShowflushMessage: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.concert = this.route.snapshot.data['concert'];
    this.isLoggedIn = this.authService.isLoggedInByTeamId(this.concert.team.id);
  }

  moveEditConcertButtonClickHander(): void {
    // エラー表示を消す
    this.canShowflushMessage = false;
    if (this.isLoggedIn) {
      this.router.navigate(['concerts', this.concert.id, 'edit']);
    }
    else {
      // 別 team でログイン中の場合もあるので一旦ログアウトさせる
      this.authService.logout();

      this.authService.login(this.concert.team.id, this.password)
      .subscribe((isLoginSuccessful: boolean) => {
          if (isLoginSuccessful) {
            this.router.navigate(['concerts', this.concert.id, 'edit']);
          }
        },
        (error: Error) => {
          this.canShowflushMessage = true;
        });
    }
  }
}
