import {RatingItem} from './RatingItem';

export class BookingRating {

  ratingItems: RatingItem[];
  ratingComment: string = '';
}

export class PropertyRating {
  id: string;
  propertyId: string;
  email: string;
  ratingItems: RatingItem[];
  firstname: string;
  lastname: string;
  companyName: string;
  phoneNumber: string;
  commentDate: string;
  ratingComment: string;
}
