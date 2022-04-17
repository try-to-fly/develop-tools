export type IFavoriteItem = {
  /** 名称 */
  name: string;
  /** url地址 */
  url: string;
  /** 概要信息 */
  summary?: string;
};

export type IFavoriteGroup = {
  name: string;
  summary?: string;
  list: IFavoriteItem[];
};
