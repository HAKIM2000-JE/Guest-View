import {GuestData} from './GuestData';
import {BookingRating} from './BookingRating';
import {Amount} from './Amount';
import {Alert} from "../Alert";
import {TheKeysAccess} from './partners/TheKeysAccess';
import {IgloohomeAccess} from './partners/IgloohomeAccess';
import {Poi} from '../Poi';
import {OnlineCheckin} from "./OnlineCheckin";

export class BookingForGuest {
  id: string;
  startDate: string;
  endDate: string;
  nights: number;
  isGone: boolean = false;
  isArrived: boolean = false;
  expectedCheckinLocalTime: string;
  expectedCheckoutLocalTime: string;

  platformName: string;
  platformReservationNumber: string;
  bookedAt: string;
  instantBooking: boolean;

  adults: number;
  children: number;
  babies: number;
  doubleBeds: number;
  singleBeds: number;
  sofaBeds: number;
  babyBeds: number;
  pets: number;
  guestNote: string;
  guestConfirmed: boolean;
  status: string;

  guests: GuestData[];
  /**
   * @deprecated igloohomeAccess should be used to get igloohome code.
   */
  iglooHomeLockCode: string;
  iglooHomeAccess: IgloohomeAccess;

  propertyRating: BookingRating;
  teammateRating: BookingRating;
  teammateInCharge: TeammateInCharge;

  swiklyAutomation: boolean;
  swiklyInfo: SwiklyInfo;

  hostWords: string;
  hostWordsDisplayed: boolean;

  alerts: Alert[];
  preCheckIn: CheckNote;

  theKeysAccesses: TheKeysAccess[];

  guestInventoryCheckIn: CheckNote;
  guestInventoryCheckOut: CheckNote;

  onLineCheck: OnlineCheckin;
  contractUrl: string;
}

export class SwiklyInfo {
  swiklyAcceptUrl: string;
  swiklyDepositCreationDate: string;
  swiklyDepositAcceptedDate: string;
  swiklyDepositAmount: Amount;
}

export class TeammateInCharge {
  teammateId: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  pictureUrl: string;
  languages: string[];
}
export class CheckNote {
  checkAt: string;
  personId: string;
  personFullName: string;
  personEmail: string;
  personPictureUrl: string;
  personPhone: string;
  // WHERE
  poi: Poi;
  // WHAT
  pictures: string[];
  videos: string[];
  comment: string;

}
