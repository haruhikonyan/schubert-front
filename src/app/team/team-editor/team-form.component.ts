import { Component, OnInit, Input } from '@angular/core';

import { AppService } from './../../app.service';
import { Team } from './../team.model';
import { Type, Region } from '../../app.model';


@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {

  @Input()
  team: Team;
  constructor(
    public appService: AppService
  ) { }

  ngOnInit() {
  }

  /**
   * 団体種別を選択した際に team に追加する
   * @param value
   */
  typeSelected(value: any): void {
    const selectedType = this.appService.types.find((type: Type) => {
      return type.id === value.id;
    });
    this.team.types.push(selectedType);
  }

  /**
   * 団体種別を選択した際に team から削除する
   * @param value
   */
  typeRemoved(value: any): void {
    this.team.types = this.team.types.filter((type: Type) => {
      return type.id !== value.id;
    });
  }

  /**
   * 活動地域を選択した際に team に追加する
   * @param value
   */
  regionSelected(value: any): void {
    const selectedRegion: Region = this.appService.regions.find((region: Region) => {
      return region.id === value.id;
    });
    this.team.regions.push(selectedRegion);
  }

  /**
   * 活動地域を選択した際に team から削除する
   * @param value
   */
  regionRemoved(value: any): void {
    this.team.regions = this.team.regions.filter((region: Region) => {
      return region.id !== value.id;
    });
  }

}
