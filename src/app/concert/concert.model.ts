import { Team } from './../team/team.model';

/**
 * Concert Entity
 */
export class Concert {
  id: string;
  title: string;
  date: Date;
  doorsOpen: Date;
  cirtainTime: Date;
  description: string;
  team: Team;
  hole: any;
  conductors: any[];
  repertoires: any[];
}
