import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { SelectModule } from 'ng2-select';
import { JwtModule } from '@auth0/angular-jwt';

// import routing module
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CanonicalRoutesResolver } from './canonical-routes.resolve';
import { TopComponent } from './top/top.component';
import { RecruitsComponent } from './recruit/recruits.component';
import { TeamsComponent } from './team/teams.component';
import { TeamDetailComponent } from './team/team-detail.component';
import { AboutComponent } from './about/about.component';
import { ConcertResolver } from './concert/concert.resolve';
import { ConcertsPageComponent } from './concert/concerts-page.component';
import { ConcertDetailPageComponent } from './concert/concert-detail-page.component';
import { ConcertFormComponent } from './concert/concert-editor/concert-form.component';
import { ConcertEditPageComponent } from './concert/concert-editor/concert-edit-page.component';
import { ConcertNewPageComponent } from './concert/concert-editor/concert-new-page.component';
import { AppService } from './app.service';
import { ConcertService } from './concert/concert.service';
import { TeamsResolver } from './team/teams.resolve';
import { TeamResolver } from './team/team.resolve';
import { TeamService } from './team/team.service';
import { RecruitsResolver } from './recruit/recruits.resolve';
import { RecruitResolver } from './recruit/recruit.resolve';
import { RecruitsCanonicalSearchResolver } from './recruit/recruits-canonical-search.resolve';
import { RecruitService } from './recruit/recruit.service';
import { RecruitEditPageComponent } from './recruit/recruit-editor/recruit-edit-page.component';
import { RecruitFormComponent } from './recruit/recruit-editor/recruit-form.component';
import { RecruitNewPageComponent } from './recruit/recruit-editor/recruit-new-page.component';
import { RecruitDetailPageComponent } from './recruit/recruit-detail-page.component';
import { InstrumentsComponent } from './recruit/instruments.component';
import { TeamNewPageComponent } from './team/team-editor/team-new-page.component';
import { TeamFormComponent } from './team/team-editor/team-form.component';
import { TeamEditPageComponent } from './team/team-editor/team-edit-page.component';
import { AdminComponent } from './team/admin/admin.component';
import { RecruitCanonicalHomeComponent } from './recruit/recruit-canonical-home/recruit-canonical-home.component';
import { LocalStorageKeyConsts } from './auth/local-storage-key.consts';

export function jwtTokenGetter() {
  return localStorage.getItem(LocalStorageKeyConsts.ACCESS_TOKEN_ITEM_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    RecruitsComponent,
    TeamsComponent,
    TeamDetailComponent,
    AboutComponent,
    ConcertsPageComponent,
    ConcertDetailPageComponent,
    ConcertFormComponent,
    ConcertEditPageComponent,
    ConcertNewPageComponent,
    RecruitEditPageComponent,
    RecruitFormComponent,
    RecruitNewPageComponent,
    RecruitDetailPageComponent,
    InstrumentsComponent,
    TeamNewPageComponent,
    TeamFormComponent,
    TeamEditPageComponent,
    AdminComponent,
    RecruitCanonicalHomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'schubert-front' }),
    HttpClientModule,
    FormsModule,
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    SelectModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
        whitelistedDomains: environment.whitelistedDomains,
        blacklistedRoutes: ['/api/teams/login']
      }
    })
  ],
  providers: [
    AppService,
    ConcertService,
    TeamService,
    TeamResolver,
    TeamsResolver,
    RecruitService,
    RecruitResolver,
    RecruitsResolver,
    RecruitsCanonicalSearchResolver,
    CanonicalRoutesResolver,
    ConcertResolver,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
