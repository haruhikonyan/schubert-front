import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule} from '@angular/http';

// import routing module
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TopComponent } from './top/top.component';
import { RecruitComponent } from './recruit/recruit.component';
import { TeamComponent } from './team/team.component';
import { AboutComponent } from './about/about.component';
import { ConcertComponent } from './concert/concert.component';
import { AppService } from './app.service';
import { ConcertService } from './concert/concert.service';
import { TeamService } from './team/team.service';
import { RecruitService } from './recruit/recruit.service';
import { RecruitEditPageComponent } from './recruit/recruit-edit-page/recruit-edit-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    RecruitComponent,
    TeamComponent,
    AboutComponent,
    ConcertComponent,
    RecruitEditPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'schubert-front' }),
    HttpModule
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
