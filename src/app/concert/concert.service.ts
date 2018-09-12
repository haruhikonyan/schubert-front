import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers,
  URLSearchParams, ResponseContentType } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import * as urljoin from 'url-join';

import { environment } from './../../environments/environment';
import { Concert } from './concert.model';

@Injectable()
export class ConcertService {

  private apiUrl: string = environment.apiUrl;
  private endpointUrl: string = urljoin(this.apiUrl, '/concerts');

  constructor(
    private http: Http,
    private authHttp: AuthHttp
  ) { }

  getConcerts(): Observable<Concert[]> {
    const options: RequestOptions = this.generateBasicRequestOptions();

    return this.http.get(this.endpointUrl, options)
                    .map((r: Response) => r.json() as Concert[])
                    .map((concerts: Concert[]) => {
                      // Date 型に変換する
                      concerts.forEach((concert: Concert) => {
                        // Date型に変換する
                        this.convertToDate(concert);
                      });
                      return concerts;
                    });
  }

  getConcertsByTeam(teamId: string): Observable<Concert[]> {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const url: string = urljoin(this.endpointUrl, 'team', teamId);

    return this.authHttp.get(url, options)
                    .map((r: Response) => r.json() as Concert[])
                    .map((concerts: Concert[]) => {
                      // Date 型に変換する
                      concerts.forEach((concert: Concert) => {
                        // Date型に変換する
                        this.convertToDate(concert);
                      });
                      return concerts;
                    });
  }

  getConcert(id: string): Observable<Concert> {
    const url: string = urljoin(this.endpointUrl, id);
    const options: RequestOptions = this.generateBasicRequestOptions();

    return this.http.get(url, options)
                    .map((r: Response) => r.json() as Concert)
                    .map((concert: Concert) => {
                      // Date型に変換する
                      this.convertToDate(concert);
                      return concert;
                    });
  }

  createConcert(concert: Concert): Observable<Concert> {
    const options: RequestOptions = this.generateBasicRequestOptions();

    return this.authHttp.post(this.endpointUrl, { concert }, options)
                    .map((r: Response) => r.json() as Concert)
                    .map((c: Concert) => {
                      // Date型に変換する
                      this.convertToDate(c);
                      return c;
                    });
  }

  editConcert(concert: Concert): Observable<Concert> {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const url: string = urljoin(this.endpointUrl, concert.id);

    return this.authHttp.put(url, { concert }, options)
                    .map((r: Response) => r.json() as Concert)
                    .map((c: Concert) => {
                      // Date型に変換する
                      this.convertToDate(c);
                      return c;
                    });
  }

  deleteConcert(concert: Concert): Observable<Concert> {
    const options: RequestOptions = this.generateBasicRequestOptions();
    const url: string = urljoin(this.endpointUrl, concert.id);

    return this.authHttp.delete(url, options)
                    .map((r: Response) => r.json() as Concert);
  }

  /**
   * このサービスで利用する基本の RequestOptions を作成する
   * @return {RequestOptions}
   */
  private generateBasicRequestOptions(): RequestOptions {
    return new RequestOptions({ withCredentials: true });
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
