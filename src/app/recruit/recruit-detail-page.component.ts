import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recruit } from './recruit.model';
import { Instrument } from '../app.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-recruit-detail-page',
  templateUrl: './recruit-detail-page.component.html',
  styleUrls: ['./recruit-detail-page.component.scss']
})
export class RecruitDetailPageComponent implements OnInit {

  // recruit情報に含まれるinstrumentsをCategory別に分けた時のCategory名のリスト
  get retainCategories(): string[] {
    return Object.keys(this.instrumentsGroupByCategory);
  }

  recruit: Recruit;
  instrumentsGroupByCategory: any = {};

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
  ) { }

  ngOnInit() {
    this.recruit = this.route.snapshot.data['recruit'];
    this.isLoggedIn = this.authService.isLoggedInByTeamId(this.recruit.team.id);
    // 募集楽器をCategoryでgrouping
    this.recruit.instruments.forEach((val: Instrument, index: number, array: Instrument[]) => {
      const datas: string[] = this.instrumentsGroupByCategory[val.instrumentCategory.name] || [];
      this.instrumentsGroupByCategory[val.instrumentCategory.name] = datas.concat(val.name);
    });
  }

  editRecruitButtonClickHandler(): void {
    // エラー表示を消す
    this.canShowflushMessage = false;
    if (this.isLoggedIn) {
      this.router.navigate(['recruits', this.recruit.id, 'edit']);
    }
    else {
      // 別 team でログイン中の場合もあるので一旦ログアウトさせる
      this.authService.logout();

      this.authService.login(this.recruit.team.id, this.password)
      .subscribe((isLoginSuccessful: boolean) => {
          if (isLoginSuccessful) {
            this.router.navigate(['recruits', this.recruit.id, 'edit']);
          }
        },
        (error: Error) => {
          this.canShowflushMessage = true;
        });
    }
  }

}
