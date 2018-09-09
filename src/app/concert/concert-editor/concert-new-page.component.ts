import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Concert } from './../concert.model';
import { ConcertService } from './../concert.service';

@Component({
  selector: 'app-concert-new-page',
  templateUrl: './concert-new-page.component.html',
  styleUrls: ['./concert-editor.component.scss']
})
export class ConcertNewPageComponent implements OnInit {

  concert: Concert;

  title: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private concertService: ConcertService,
  ) { }

  ngOnInit() {
    this.concert = new Concert();
  }

  createConcertButtonClickHander(): void {
    this.concertService.createConcert(this.concert)
      .subscribe((concert: Concert) => {
        this.router.navigate(['concert', concert.id]);
      });
  }

}
