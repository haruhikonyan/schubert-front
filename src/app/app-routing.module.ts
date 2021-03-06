import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopComponent } from './top/top.component';
import { CanonicalRoutesResolver } from './canonical-routes.resolve';
import { ConcertResolver } from './concert/concert.resolve';
import { RecruitResolver } from './recruit/recruit.resolve';
import { RecruitsResolver } from './recruit/recruits.resolve';
import { RecruitsCanonicalSearchResolver } from './recruit/recruits-canonical-search.resolve';
import { RecruitsComponent } from './recruit/recruits.component';
import { RecruitNewPageComponent } from './recruit/recruit-editor/recruit-new-page.component';
import { RecruitEditPageComponent } from './recruit/recruit-editor/recruit-edit-page.component';
import { RecruitDetailPageComponent } from './recruit/recruit-detail-page.component';
import { RecruitCanonicalHomeComponent } from './recruit/recruit-canonical-home/recruit-canonical-home.component';
import { TeamResolver } from './team/team.resolve';
import { TeamsResolver } from './team/teams.resolve';
import { TeamsComponent } from './team/teams.component';
import { TeamDetailComponent } from './team/team-detail.component';
import { TeamNewPageComponent } from './team/team-editor/team-new-page.component';
import { AdminComponent } from './team/admin/admin.component';
import { TeamEditPageComponent } from './team/team-editor/team-edit-page.component';
import { ConcertsPageComponent } from './concert/concerts-page.component';
import { ConcertDetailPageComponent } from './concert/concert-detail-page.component';
import { ConcertEditPageComponent } from './concert/concert-editor/concert-edit-page.component';
import { ConcertNewPageComponent } from './concert/concert-editor/concert-new-page.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { path: '', component: TopComponent,
              resolve: { canonicalRoutes: CanonicalRoutesResolver }},
  { path: 'recruits', component: RecruitsComponent,
                      resolve: { recruits: RecruitsResolver }},
  { path: 'recruits/new', component: RecruitNewPageComponent},
  { path: 'recruits/:recruitId/edit', component: RecruitEditPageComponent,
                                      resolve: { recruit: RecruitResolver }},
  { path: 'recruits/cr/:canonicalModelName', component: RecruitCanonicalHomeComponent,
                                             resolve: { canonicalRoutes: CanonicalRoutesResolver }},
  { path: 'recruits/cr/:canonicalModelName/:canonicalId', component: RecruitsComponent,
                                                          resolve: { recruits: RecruitsCanonicalSearchResolver }},
  { path: 'recruits/:recruitId', component: RecruitDetailPageComponent,
                                 resolve: { recruit: RecruitResolver }},
  { path: 'teams', component: TeamsComponent,
                   resolve: { teams: TeamsResolver }},
  { path: 'teams/new', component: TeamNewPageComponent},
  { path: 'teams/:teamId', component: TeamDetailComponent,
                           resolve: { team: TeamResolver }},
  { path: 'teams/:teamId/edit', component: TeamEditPageComponent,
                                resolve: { team: TeamResolver }},
  { path: 'teams/:teamId/admin', component: AdminComponent},
  { path: 'concerts', component: ConcertsPageComponent},
  { path: 'concerts/new', component: ConcertNewPageComponent},
  { path: 'concerts/:concertId/edit', component: ConcertEditPageComponent,
                                      resolve: { concert: ConcertResolver }},
  { path: 'concerts/:concertId', component: ConcertDetailPageComponent,
                                 resolve: { concert: ConcertResolver }},
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
