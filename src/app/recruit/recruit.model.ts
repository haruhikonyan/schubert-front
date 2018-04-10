import { Team } from '../team/team.model';
import { Instrument } from '../app.model';


/**
 * Recruit Entity
 */
export class Recruit {
  id: number;
  title: string;
  practicePlace: string;
  practiceTime: string;
  description: string;
  publishedFrom: Date;
  publishedTo: Date;
  team: Team;
  instruments: Instrument;
}
