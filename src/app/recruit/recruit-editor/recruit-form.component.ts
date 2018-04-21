import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AppService } from './../../app.service';
import { Recruit } from '../recruit.model';
import { Team } from '../../team/team.model';

@Component({
  selector: 'app-recruit-form',
  templateUrl: './recruit-form.component.html',
  styleUrls: ['./recruit-form.component.scss']
})
export class RecruitFormComponent implements OnInit {

  @Input()
  recruit: Recruit;
  constructor(
    public appService: AppService
  ) { }

  ngOnInit() {
  }

}
