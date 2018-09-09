import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Concert, Conductor, Repertoire } from './../concert.model';
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
    this.concert.conductors.push(new Conductor());
    this.concert.repertoires.push(new Repertoire());
  }

  createConcertButtonClickHander(): void {
    this.concertService.createConcert(this.concert)
      .subscribe((concert: Concert) => {
        this.router.navigate(['concert', concert.id]);
      });
  }

}
