import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopComponent } from './top/top.component';
import { RecruitComponent } from './recruit/recruit.component';
import { TeamComponent } from './team/team.component';
import { ConcertComponent } from './concert/concert.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { path: '', component: TopComponent},
  { path: 'recruit', component: RecruitComponent},
  { path: 'team', component: TeamComponent},
  { path: 'concert', component: ConcertComponent},
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
