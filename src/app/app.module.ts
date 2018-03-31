import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import routing module
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TopComponent } from './top/top.component';
import { RecruitComponent } from './recruit/recruit.component';
import { TeamComponent } from './team/team.component';
import { AboutComponent } from './about/about.component';
import { ConcertComponent } from './concert/concert.component';

@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    RecruitComponent,
    TeamComponent,
    AboutComponent,
    ConcertComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'schubert-front' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
