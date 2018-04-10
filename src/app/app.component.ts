import { Component, OnInit } from '@angular/core';
import { Type, Instrument, InstrumentCategory } from './app.model';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  types: Type[];

  constructor(private appServise: AppService) { }

  ngOnInit() {
    this.appServise.getTypes()
      .map((types: Type[]) => {
        this.types = types;
      })
      .subscribe();
  }
}
