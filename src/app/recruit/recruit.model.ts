import { Team } from '../team/team.model';

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

/**
 * Instrument Entity
 */
export class Instrument {
  id: number;
  name: string;
  shortName: string;
  sortNumber: number;
  instrumentCategory: InstrumentCategory;
}

/**
 * InstrumentCategory Entity
 */
export class InstrumentCategory {
  id: number;
  name: string;
}
