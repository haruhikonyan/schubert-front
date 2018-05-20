// tslint:disable-next-line:no-namespace
export namespace LocalStorageKeyConsts {

  /**
   * アクセストークンを localStorage に保存する際のキー名
   *  angular2-jwt で利用されるデフォルトの Token Name を利用
   *
   * @type {string}
   * @memberOf LocalStorageKeyConsts
   */
  export const ACCESS_TOKEN_ITEM_KEY: string = 'token';

  /**
   * ユーザーの情報を localStorage に保存する際のキー名
   *
   * @type {string}
   * @memberOf LocalStorageKeyConsts
   */
  export const STORED_TEAM_DATA_KEY: string = 'sbt-team-data';
}
