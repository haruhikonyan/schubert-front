import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AppService } from './../../app.service';
import { Concert } from './../concert.model';

@Component({
  selector: 'app-concert-form',
  templateUrl: './concert-form.component.html',
  styleUrls: ['./concert-form.component.scss']
})
export class ConcertFormComponent implements OnInit {

  @Input()
  concert: Concert;
  constructor(
    public appService: AppService
  ) { }

  ngOnInit() {

  }

}
