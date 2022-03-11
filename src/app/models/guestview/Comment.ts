export class Comment {
  personId: string;
  name: string;
  pictureUrl: string;
  insertDate: string;

  comment: string;
  commentShort: string;
  commentLong: string;
  ranking: number;
  priceRanking: number;
  favRecPictureUrl: string;
  translations: any[];
  isTranslation = false;
  created: any;
  type: any;
  language: any;

  constructor(obj?: {}) {
    if (obj) {
      this.language = obj['language'] ? obj['language'] : 'fr';
      this.personId = obj['personId'] || '';
      this.name = obj['name'] || '';
      this.pictureUrl = obj['pictureUrl'] || 'https://eu.ui-avatars.com/api/?size=200&background=337af7&color=fff&name=' + this.name.substring(0, 1);
      this.insertDate = obj['insertDate'] || '';
      this.translations = obj['translations'] || [];
      this.commentLong = obj['comment'] ? this.defineCommentByTranslate() : '';
      this.comment = obj['comment'] ? this.defineCommentByTranslate() : '';
      this.commentShort = '';
      this.ranking = obj['ranking'] || 0;
      this.priceRanking = obj['priceRanking'] || 0;
      this.favRecPictureUrl = obj['favRecPictureUrl'] || '';
      this.isTranslation = obj['isTranslation'] || false;
      this.type = obj['type'] ? obj['type'] : 'community';
      this.created = obj['insertDate'] ? this.defineTimeCreated(obj['insertDate']) : '';
      this.parseComment();
    }
  }

  defineCommentByTranslate() {
    let comment = '';
    this.translations.forEach( (resComment: any) => {
      if ( resComment.language === this.language) {
        comment = resComment.comment;
      }
    });
    return comment;

  }

  parseComment() {
    if (this.commentLong.length > 190) {
      this.commentShort = this.comment.substring(0, 190) + '...';
      this.comment = this.commentShort;
    } else {
      this.comment = this.commentLong;
    }
  }

  public defineTimeCreated(date) {
    let createdTime;
    const today = new Date();
    const actionTime = new Date(date);
    const difference =  today.getTime() - actionTime.getTime() ; // This will give difference in milliseconds

    const seconds = Math.trunc(difference / 1000);
    const minutes = Math.trunc(((difference % 86400000) % 3600000) / 60000);
    const hours =  Math.trunc(difference / (1000 * 60 * 60));
    const days =  Math.trunc(difference / (60 * 60 * 24 * 1000));
    const months = Math.trunc(difference % 31557600000 / (1000 * 60 * 60 * 24 * 30.5 ));
    const years = Math.trunc(difference / 31536000000);

    if ( seconds < 60 ) {
      // created_time = seconds + 's ago'
      if ( seconds === 0 ) {
        createdTime = this.outPutTime(null, 'now');
      } else {
        createdTime =  this.outPutTime(seconds, 'second');
      }
    }
    if ( minutes < 60 && minutes > 0 ) {
      createdTime = this.outPutTime(minutes, 'minute');
    }
    if ( hours < 24 && hours > 0 ) {
      createdTime = this.outPutTime(hours, 'hour');
    }
    if ( days < 30 && days > 0 ) {
      createdTime = this.outPutTime(days, 'day');
    }
    if ( months < 12 && months > 0  ) {
      createdTime = this.outPutTime(months, 'month');
    }
    if ( years > 0 ) {
      createdTime = this.outPutTime(years, 'year');
    }
    return createdTime;
  }

  outPutTime(value , type) {
    return this.singleOrMultiple(value, type);
  }

  public singleOrMultiple(num, type) {
    let output;
    if (num <= 1) {
      output = { time: num, typeTime: type };
    } else {
      output = { time: num, typeTime: type + 's' };
    }
    return output;
  }
}
