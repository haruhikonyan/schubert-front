import { Component, OnInit } from '@angular/core';
import { Type, Instrument, InstrumentCategory } from './app.model';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private appServise: AppService) { }

  ngOnInit() {
    this.appServise.getTypes();
    this.appServise.getInstruments();
    this.appServise.getInstrumentCategories();
  }
}
