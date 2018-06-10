// ページ全体で使うような汎用モデル

/**
 * Type Entity
 */
export class Type {
  id: number;
  name: string;
}

/**
 * Region Entity
 */
export class Region {
  id: number;
  name: string;
  sortNumber: number;
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
 * CanonicalRoute Entity
 */
export class CanonicalRoute {
  id: number;
  canonicalId: string;
  canonicalModelName: string;
  label: string;
  orderInCategory: number;
  isListedOnTop: boolean;
  isListedOnModelTop: boolean;
}

/**
 * InstrumentCategory Entity
 */
export class InstrumentCategory {
  id: number;
  name: string;
}
