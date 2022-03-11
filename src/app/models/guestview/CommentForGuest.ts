export class CommentForGuest {
  name: string;
  pictureUrl: string;
  insertDate: string;
  comment: string;
  ranking: number;
  priceRanking: number;
  translations: CommentTranslation[];
}
export class CommentTranslation {
  language: string;
  comment: string;
  original: boolean;
}
