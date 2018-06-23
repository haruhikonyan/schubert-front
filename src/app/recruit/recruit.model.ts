import { Team } from '../team/team.model';
import { Instrument } from '../app.model';


/**
 * Recruit Entity
 */
export class Recruit {
  id: string;
  title: string;
  practicePlace: string;
  practiceTime: string;
  description: string;
  publishedFrom: Date = new Date();
  publishedTo: Date = new Date();
  team: Team;
  instruments: Instrument[] = [];
  constructor() {
    // date-fns とか使ったらもっとスマートにできるかも？
    // 初期値は現在の日付かつ時間は０時０分０秒にしたい
    this.publishedFrom.setHours(0);
    this.publishedFrom.setMinutes(0);
    this.publishedFrom.setSeconds(0);
    this.publishedTo.setHours(0);
    this.publishedTo.setMinutes(0);
    this.publishedTo.setSeconds(0);
  }
}

/**
 * SearchCondition Entity
 * TODO 別の場所に移したほうが良いかもしれない
 */
export class SearchCondition {
  isPublished: boolean;
  typeIds: string;
  instrumentIds: string;
  freeWords: string;
  // TODO 条件追加
}
