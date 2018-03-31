import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import routing module
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TopComponent } from './top/top.component';

@NgModule({
  declarations: [
    AppComponent,
    TopComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'schubert-front' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
