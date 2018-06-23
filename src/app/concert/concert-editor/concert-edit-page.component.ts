import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Concert } from './../concert.model';
import { ConcertService } from './../concert.service';

@Component({
  selector: 'app-concert-edit-page',
  templateUrl: './concert-edit-page.component.html',
  styleUrls: ['./concert-editor.component.scss']
})
export class ConcertEditPageComponent implements OnInit {

  concert: Concert;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private concertService: ConcertService,
  ) { }

  ngOnInit() {
    this.concert = this.route.snapshot.data['concert'];
  }

}
