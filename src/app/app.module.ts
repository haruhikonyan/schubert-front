import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// import routing module
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TopComponent } from './top/top.component';
import { RecruitsComponent } from './recruit/recruits.component';
import { TeamsComponent } from './team/teams.component';
import { AboutComponent } from './about/about.component';
import { ConcertComponent } from './concert/concert.component';
import { AppService } from './app.service';
import { ConcertService } from './concert/concert.service';
import { TeamService } from './team/team.service';
import { RecruitService } from './recruit/recruit.service';
import { RecruitEditPageComponent } from './recruit/recruit-editor/recruit-edit-page.component';
import { RecruitFormComponent } from './recruit/recruit-editor/recruit-form.component';
import { RecruitNewPageComponent } from './recruit/recruit-editor/recruit-new-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    RecruitsComponent,
    TeamsComponent,
    AboutComponent,
    ConcertComponent,
    RecruitEditPageComponent,
    RecruitFormComponent,
    RecruitNewPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'schubert-front' }),
    HttpModule,
    FormsModule
  ],
  providers: [
    AppService,
    ConcertService,
    TeamService,
    RecruitService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
