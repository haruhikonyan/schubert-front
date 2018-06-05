import { Region } from './../app.model';
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
  hole: Hole;
  conductors: Conductor[];
  repertoires: Repertoire[];
}

/**
 * Hole Entity
 */
export class Hole {
  id: number;
  name: string;
  address: string;
  url: string;
  description: string;
  region: Region;
}

/**
 * Conductor Entity
 */
export class Conductor {
  id: number;
  name: string;
  description: string;
  url: string;
}

/**
 * Repertoire Entity
 */
export class Repertoire {
  id: number;
  arranger: string;
  description: string;
  concertId: string;
  tune: any;
  solists: any[];
}
