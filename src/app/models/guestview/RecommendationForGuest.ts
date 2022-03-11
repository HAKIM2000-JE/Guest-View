import { Poi } from '../Poi';
import { CommentForGuest } from './CommentForGuest';

export class RecommendationForGuest {
  fullAddress: string;
  poi: Poi;
  title: string;
  category: string;
  phoneNumber: string;
  webSite: string;
  childFriendly: boolean;
  disabledSuitable: boolean;
  description: string;
  photos: string[];
  ranking: number;
  priceRanking: number;
  superRecommendation: boolean;
  ollcaUrlLink: string;
  tagIds: string[];
  distance: number;
  commentedByHost: boolean;
  communityComments: CommentForGuest[];
  hostComment: CommentForGuest[];
  googlePlaceId: string;
}

export class CategoryForGuest {
  static readonly RESTAURANT = 'restaurant';
  static readonly BAKERY = 'bakery';
  static readonly COFFEE = 'coffee';
  static readonly PUB = 'pub';
  static readonly ACTIVITY = 'activity';
  // static readonly SHOP = 'shop';
  static readonly MONUMENT = 'monument';
  static readonly OTHER = 'other';
  // static readonly ALL = 'all';

  list: any[] = [];

  constructor() {
    this.parseToList();
  }

  parseToList() {
    // tslint:disable-next-line:forin
    for (const category in CategoryForGuest ) {
      this.list.push({name: CategoryForGuest[category], icon: 'assets/icon/icon-recommendation-' + CategoryForGuest[category] + '.svg'});
    }
  }

}
