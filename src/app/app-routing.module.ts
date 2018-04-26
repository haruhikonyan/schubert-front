import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopComponent } from './top/top.component';
import { RecruitResolver } from './recruit/recruit.resolve';
import { RecruitsResolver } from './recruit/recruits.resolve';
import { RecruitsComponent } from './recruit/recruits.component';
import { RecruitNewPageComponent } from './recruit/recruit-editor/recruit-new-page.component';
import { RecruitEditPageComponent } from './recruit/recruit-editor/recruit-edit-page.component';
import { TeamResolver } from './team/team.resolve';
import { TeamsResolver } from './team/teams.resolve';
import { TeamsComponent } from './team/teams.component';
import { TeamNewPageComponent } from './team/team-editor/team-new-page.component';
import { TeamEditPageComponent } from './team/team-editor/team-edit-page.component';
import { ConcertComponent } from './concert/concert.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { path: '', component: TopComponent},
  { path: 'recruits', component: RecruitsComponent,
                      resolve: { recruits: RecruitsResolver }},
  { path: 'recruits/new', component: RecruitNewPageComponent},
  { path: 'recruits/:recruitId/edit', component: RecruitEditPageComponent,
                                      resolve: { recruit: RecruitResolver }},
  { path: 'teams', component: TeamsComponent,
                   resolve: { teams: TeamsResolver }},
  { path: 'teams/new', component: TeamNewPageComponent},
  { path: 'teams/:teamId/edit', component: TeamEditPageComponent,
                                resolve: { recruit: TeamResolver }},
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
