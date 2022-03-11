import {BookingForGuest} from './BookingForGuest';
import {PropertyForGuest} from './PropertyForGuest';
import {PlatformAffiliateServices} from './PlatformAffiliateServices';
import {BookletReviews} from '../BookletReviews';
import {Corporate} from "./Corporate";

export class PropertyAndBookingForGuestDto {
  property: PropertyForGuest;
  booking: BookingForGuest;
  bookletReviews: BookletReviews;
  platformAffiliateServices: PlatformAffiliateServices[];
  corporate: Corporate;
  hasUpsales: boolean;
}
