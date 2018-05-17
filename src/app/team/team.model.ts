
import { Type, Region } from '../app.model';

/**
 * Team Entity
 */
export class Team {
  id: string;
  password: string;
  name: string;
  mail: string;
  url: string;
  description: string;
  isPublished: boolean;
  types: Type[] = [];
  regions: Region[] = [];
}
