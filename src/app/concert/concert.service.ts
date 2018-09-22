
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';


import * as urljoin from 'url-join';

import { environment } from './../../environments/environment';
import { Concert } from './concert.model';

@Injectable()
export class ConcertService {

  private apiUrl: string = environment.apiUrl;
  private endpointUrl: string = urljoin(this.apiUrl, '/concerts');

  constructor(
    private http: HttpClient
  ) { }

  getConcerts(): Observable<Concert[]> {

    return this.http.get<Concert[]>(this.endpointUrl)
                    .pipe(
                      map((concerts: Concert[]) => {
                        // Date 型に変換する
                        concerts.forEach((concert: Concert) => {
                          // Date型に変換する
                          this.convertToDate(concert);
                        });
                        return concerts;
                      })
                    );
  }

  getConcertsByTeam(teamId: string): Observable<Concert[]> {
    const url: string = urljoin(this.endpointUrl, 'team', teamId);

    return this.http.get<Concert[]>(url)
                    .pipe(
                      map((concerts: Concert[]) => {
                        // Date 型に変換する
                        concerts.forEach((concert: Concert) => {
                          // Date型に変換する
                          this.convertToDate(concert);
                        });
                        return concerts;
                      })
                    );
  }

  getConcert(id: string): Observable<Concert> {
    const url: string = urljoin(this.endpointUrl, id);

    return this.http.get<Concert>(url)
                    .pipe(
                      map((concert: Concert) => {
                        // Date型に変換する
                        this.convertToDate(concert);
                        return concert;
                      })
                    );
  }

  createConcert(concert: Concert): Observable<Concert> {

    return this.http.post<Concert>(this.endpointUrl, { concert })
                    .pipe(
                      map((c: Concert) => {
                        // Date型に変換する
                        this.convertToDate(c);
                        return c;
                      })
                    );
  }

  editConcert(concert: Concert): Observable<Concert> {
    const url: string = urljoin(this.endpointUrl, concert.id);

    return this.http.put<Concert>(url, { concert })
                    .pipe(
                      map((c: Concert) => {
                        // Date型に変換する
                        this.convertToDate(c);
                        return c;
                      })
                    );
  }

  deleteConcert(concert: Concert): Observable<Concert> {
    const url: string = urljoin(this.endpointUrl, concert.id);

    return this.http.delete<Concert>(url);
  }

  /**
   * Concertモデルの日付データをDate型に変換する
   *
   * @private
   * @param {Concert} concert
   * @memberof ConcertService
   */
  private convertToDate(concert: Concert) {
    concert.cirtainTime = new Date(concert.cirtainTime);
    concert.date = new Date(concert.date);
    concert.doorsOpen  = new Date(concert.doorsOpen);
  }

}
