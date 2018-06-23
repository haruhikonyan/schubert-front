import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConcertService } from './concert.service';
import { Concert } from './concert.model';

@Component({
  selector: 'app-concert-detail',
  templateUrl: './concert-detail-page.component.html',
  styleUrls: ['./concert-detail-page.component.scss']
})
export class ConcertDetailPageComponent implements OnInit {

  concert: Concert;

  constructor(
    private route: ActivatedRoute,
    private concertService: ConcertService
  ) {
    // get params from route
    const id: string = route.snapshot.params['id'];
     // サービスメソッド呼び出し
     this.concertService.getConcert(id)
      .map((concert: Concert) => {
        this.concert = concert;
      })
      .subscribe();
  }

  ngOnInit() {
  }

}
