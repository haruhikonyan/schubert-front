import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopComponent } from './top/top.component';
import { RecruitsComponent } from './recruit/recruits.component';
import { RecruitNewPageComponent } from './recruit/recruit-editor/recruit-new-page.component';
import { RecruitEditPageComponent } from './recruit/recruit-editor/recruit-edit-page.component';
import { TeamsComponent } from './team/teams.component';
import { ConcertComponent } from './concert/concert.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { path: '', component: TopComponent},
  { path: 'recruits', component: RecruitsComponent},
  { path: 'recruits/new', component: RecruitNewPageComponent},
  // resolve をつけて team 取得
  { path: 'recruits/:recruitId/edit', component: RecruitEditPageComponent},
  { path: 'teams', component: TeamsComponent},
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
