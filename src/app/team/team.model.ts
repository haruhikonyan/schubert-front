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

/**
 * Type Entity
 */
export class Type {
  id: number;

}

/**
 * Region Entity
 */
export class Region {
  id: number;
  name: string;
  sortNumber: number;
}
