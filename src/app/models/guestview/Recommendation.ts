import {Poi} from '../Poi';
import {Comment} from './Comment';
import {RecommendationCategory} from './RecommendationCategory';
import * as moment from 'moment';

export class Recommendation {
  id: string;
  fullAddress: string;
  yaagoReco: boolean;
  title: string;
  ranking: { rating: number, icons: any[] };
  image: any;
  categories: string[];
  priceRanking: { rating: number, icons: any[], label: string };
  photos: string[];
  mainPhoto: string;
  distance: number;
  poi: Poi;
  category: any;
  comment: Comment;
  reviews: Comment[];
  phoneNumber: any;
  webSite: any;
  tagIds: string[];
  direction: any;
  language: string;
  facebook: string;
  instagram: string;
  googlePlaceId: string;
  createdById: string;
  creationDate: string;
  durationSinceCreation: any;
  influencerDetails: InfluencerDetails;

  startDate: string;
  endDate: string;

  constructor( obj: any , lang: string, personId?: string) {
    this.language = lang;
    this.id = obj['id'] || null;
    this.fullAddress = obj['fullAddress'] || '';
    this.title = obj['title'] || '';
    this.ranking = this.definePlaceRate(Number(obj['ranking'] || 0));
    this.poi = obj['poi'] || new Poi();
    this.priceRanking = this.definePriceRateIcons(Number(obj['priceRanking'] || 0));
    // this.comment = this.defineComment(obj['hostComments'] || null, obj['comments'] || null, this.language);

    this.photos = obj['photos'] || [];
    this.mainPhoto = this.photos && this.photos.length > 0 ? this.photos[0] : 'assets/images/recommendation/no-image.png' ;
    this.categories = obj['category'] || [];
    this.distance = obj['distance'] ? obj['distance'].toFixed(2) : 0;
    this.category = obj['category'] || '';
    this.phoneNumber = obj['phoneNumber'] || null;
    this.webSite = obj['webSite'] || null;
    this.tagIds = obj['tagIds'] || [];
    this.googlePlaceId = obj['googlePlaceId'] || '';
    this.yaagoReco = obj['yaagoReco'];

    this.creationDate = obj.creationDate;
    this.startDate = obj.startDate;
    this.endDate = obj.endDate;
    this.durationSinceCreation = this.getDurationSinceDate();

    for ( const cat of new RecommendationCategory().list ) {
      if (cat.key === this.category ) {
        this.category = cat;
      }
    }

    this.influencerDetails = obj['influencerDetails'] || null;
    this.facebook = obj.facebook;
    this.instagram = obj.instagram;
    this.reviews = this.defineReviews(obj.hostComments, obj.comments);
    this.comment = this.setMainComment(this.reviews, personId);



    /*this.reviews = obj['comments'] ? obj['comments'].map( (comment: Comment) => {
      comment.language = this.language;
      return new Comment(comment);
    }) :  new Comment({});*/
  }
  setMainComment(comments: any[], personId: string) {
    let comment = new Comment({});
    if (!comments || comments.length === 0) {
      return comment;
    }

    if (this.influencerDetails != null) {
      comment = comments[0];
      comment.type = 'influencer';
      if (comment.pictureUrl == null || comment.pictureUrl === '') {
        comment.pictureUrl = 'assets/images/instagram_logo.png';
      } else {
        comment.pictureUrl = comment.pictureUrl;
      }
      return new Comment(comment);
    } else if (this.yaagoReco) {
      comment = comments[0];
      comment.name = "";
      comment.type = 'yaago';
      comment.pictureUrl = 'assets/images/yaago-logo-circular-transparent.svg';
      return new Comment(comment);
    }


    const hostComment = comments.find(item => item.personId === personId);
    if (hostComment) {
      comment = hostComment;
      comment.type = 'myHost';
      return new Comment(comment);
    }

    const communityCreated = comments.find(item => item.personId === this.createdById);
    if (communityCreated) {
      comment = communityCreated;
      comment.type = 'community';
      return new Comment(comment);
    }



    comment = comments[0];
    comment.type = 'community';

    return new Comment(comment);

  }
  private getDurationSinceDate(): any {
    const output = { time: null, typeTime: null };
    const endDate = moment();
    let startDate = null;
    if (this.creationDate) {
      startDate = moment(this.creationDate);
    } else if (this.comment && this.comment.insertDate) {
      startDate = moment(this.comment.insertDate);
    }
    if (startDate) {
      if (endDate.diff(startDate, 'years') !== 0) {
        output.time = endDate.diff(startDate, 'years');
        output.typeTime = endDate.diff(startDate, 'years') > 1 ? 'years' : 'year';
        return output;
      }
      if (endDate.diff(startDate, 'months') !== 0) {
        output.time = endDate.diff(startDate, 'months');
        output.typeTime = endDate.diff(startDate, 'months') > 1 ? 'months' : 'month';
        return output;
      }
      if (endDate.diff(startDate, 'days') !== 0) {
        output.time = endDate.diff(startDate, 'days');
        output.typeTime = endDate.diff(startDate, 'days') > 1 ? 'days' : 'day';
        return output;
      }
      if (endDate.diff(startDate, 'hours') !== 0) {
        output.time = endDate.diff(startDate, 'hours');
        output.typeTime = endDate.diff(startDate, 'hours') > 1 ? 'hours' : 'hour';
        return output;
      }
      if (endDate.diff(startDate, 'minutes') !== 0) {
        output.time = endDate.diff(startDate, 'minutes');
        output.typeTime = endDate.diff(startDate, 'minutes') > 1 ? 'minutes' : 'minute';
        return output;
      }
      if (endDate.diff(startDate, 'seconds') !== 0) {
        output.time = endDate.diff(startDate, 'seconds');
        output.typeTime = endDate.diff(startDate, 'seconds') > 1 ? 'seconds' : 'second';
        return output;
      }
      if (endDate.diff(startDate, 'seconds') === 0) {
        output.time = null;
        output.typeTime = 'now';
        return output;
      }
    }
    return output;
  }

  definePriceRateIcons(rating: number) {
    const icons = [];
    for ( let i = 0; i < rating; i++) {
      const obj = { url: '', position: 0, cardUrl: ''};
      if ( rating === 1 ) {
        obj.url = 'assets/icon/icon-rate-free.svg';
        obj.cardUrl = 'assets/icon/icon-rate-free-card.svg';
        obj.position = i;
      } else {
        obj.url = 'assets/icon/icon-rate-coin.svg';
        obj.cardUrl = 'assets/icon/icon-rate-coin-card.svg';
        obj.position = i === 0 ? 0 : (i - 1) * 14;
      }
      if (rating !== 1 && i !== 0) {
        icons.push( obj );
      } else {
        if (rating === 1) {
          icons.push( obj );
        }
      }
    }
    return { rating, icons, label: this.defineLabel(rating) };
  }

  definePlaceRate(rating) {
    const icons = [];
    for ( let i = 0; i < 5; i++) {
      const obj = { url: 'assets/icon/icon-rate-rating-card.svg', value: i + 1};
      icons.push(obj);
    }
    return {rating, icons};
  }

  defineLabel(rating: number) {
    let outPut = '';
    if ( rating === 1) {
      outPut = '';
    } else if ( rating === 2 ) {
      outPut = 'low';
    } else if ( rating === 3 ) {
      outPut = 'medium';
    } else if ( rating === 4) {
      outPut = 'expensive';
    } else {
      outPut = 'notRated';
    }
    return outPut;
  }

  defineComment(hostComments, comments, language) {
    let comment = new Comment({});
    if (hostComments && hostComments.length) {
      comment = hostComments[0];
      comment['type'] = 'myHost';
    } else {
      if (comments && comments.length) {
        comment = comments[ comments.length - 1 ];
      }
    }
    comment.language = language;
    return new Comment(comment);
  }

  private defineReviews(hostComments: any, comments: any) {
    let reviews = [];
    if (hostComments && hostComments.length > 0) {
      reviews = reviews.concat(hostComments);
    }
    if (comments && comments.length > 0) {
      reviews = reviews.concat(comments);
    }
    return reviews;
  }
}

export class InfluencerDetails {
  bio: string;
  socialMediaUrl: string;
}
