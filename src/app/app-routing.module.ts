import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopComponent } from './top/top.component';
import { RecruitComponent } from './recruit/recruit.component';
import { RecruitEditPageComponent } from './recruit/recruit-edit-page/recruit-edit-page.component';
import { TeamComponent } from './team/team.component';
import { ConcertComponent } from './concert/concert.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { path: '', component: TopComponent},
  { path: 'recruits', component: RecruitComponent},
  { path: 'recruits/new', component: RecruitEditPageComponent},
  // resolve をつけて team 取得
  { path: 'teams/:id/recruit/new', component: RecruitEditPageComponent},
  { path: 'teams', component: TeamComponent},
  { path: 'concerts', component: ConcertComponent},
  { path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: true } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
