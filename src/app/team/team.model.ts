
import { Type, Region } from '../app.model';

/**
 * Team Entity
 */
export class Team {
  id: number;
  name: string;
  mail: string;
  url: string;
  description: string;
  isPublished: boolean;
  types: Type[];
  regions: Region[];
}
