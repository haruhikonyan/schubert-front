import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { SelectModule } from 'ng2-select';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';

// import routing module
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CanonicalRoutesResolver } from './canonical-routes.resolve';
import { TopComponent } from './top/top.component';
import { RecruitsComponent } from './recruit/recruits.component';
import { TeamsComponent } from './team/teams.component';
import { TeamDetailComponent } from './team/team-detail.component';
import { AboutComponent } from './about/about.component';
import { ConcertsPageComponent } from './concert/concerts-page.component';
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

// configure angular2-jwt
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    noJwtError: true,
  }), http, options);
}
const AUTH_PROVIDERS = {
  provide: AuthHttp,
  useFactory: authHttpServiceFactory,
  deps: [Http, RequestOptions]
};

@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    RecruitsComponent,
    TeamsComponent,
    TeamDetailComponent,
    AboutComponent,
    ConcertsPageComponent,
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
    HttpModule,
    FormsModule,
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    SelectModule,
  ],
  providers: [
    AUTH_PROVIDERS,
    JwtHelper,
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
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
