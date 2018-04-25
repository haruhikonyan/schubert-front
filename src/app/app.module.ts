import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { SelectModule } from 'ng2-select';

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
import { RecruitResolver } from './recruit/recruit.resolve';
import { RecruitService } from './recruit/recruit.service';
import { RecruitEditPageComponent } from './recruit/recruit-editor/recruit-edit-page.component';
import { RecruitFormComponent } from './recruit/recruit-editor/recruit-form.component';
import { RecruitNewPageComponent } from './recruit/recruit-editor/recruit-new-page.component';
import { TeamNewPageComponent } from './team/team-editor/team-new-page.component';
import { TeamFormComponent } from './team/team-editor/team-form.component';

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
    RecruitNewPageComponent,
    TeamNewPageComponent,
    TeamFormComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'schubert-front' }),
    HttpModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    SelectModule,
  ],
  providers: [
    AppService,
    ConcertService,
    TeamService,
    RecruitService,
    RecruitResolver,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
