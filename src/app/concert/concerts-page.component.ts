import { Component, OnInit } from '@angular/core';

import { ConcertService } from './concert.service';
import { Concert } from './concert.model';

@Component({
  selector: 'app-concerts',
  templateUrl: './concerts-page.component.html',
  styleUrls: ['./concerts-page.component.scss']
})
export class ConcertsPageComponent implements OnInit {

  concerts: Concert[] = [];

  constructor(
    private concertService: ConcertService
  ) { }

  ngOnInit() {
    // サービスメソッド呼び出し
    this.concertService.getConcerts()
      .map((concerts: Concert[]) => {
        this.concerts = concerts;
      })
      .subscribe();
  }

}
