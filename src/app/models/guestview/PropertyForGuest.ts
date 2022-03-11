import {Photo} from '../Photo';
import {UsefulNumber} from '../UsefulNumber';
import {Guide} from '../Guide';
import {PersonForGuest} from './PersonForGuest';
import {Person} from '../Person';
import {Poi} from '../Poi';
import {RecommendationForGuest} from './RecommendationForGuest';
import {DescriptionForGuest} from './DescriptionForGuest';

export class PropertyForGuest {
  id: string;
  title: string;
  description: string;
  descriptionForGuest: DescriptionForGuest;
  fullAddress: string;
  poi: Poi;
  defaultCheckInTime: string;
  defaultCheckOutTime: string;

  bedrooms: number;
  bathrooms: number;
  doubleBeds: number;
  singleBeds: number;
  sofaBeds: number;
  babyBeds: number;
  numberOfFloors: number;



  photos: Photo[];
  usefulNumbers: UsefulNumber[];
  guides: Guide[];
  forceMajeureItems: string[];
  recommendations: RecommendationForGuest[];

  host: PersonForGuest;
  coHosts: PersonForGuest[];
  teammates: PersonForGuest[];
  iglooHomeDisplayWelcomeBooklet: boolean;
  smartLockDisplayWelcomeBooklet: boolean;

  coHostInCharge: CoHostInCharge;
  showMeAsHost: boolean;

// DD 01/09/2021 Add matterPortUrl for the Booklet
  matterportUrl: string;
  noshowMatterportOnBooklet: boolean;

  // DD : 02/09/2021 For Simon Colmar Pre Check needed
  needPreCheck: boolean;
  canEarlyCheck: boolean;
  handlePendingAmountWithSwikly: boolean;

  noshowRecommendationOnBooklet: boolean;
  noshowHygieneOnBooklet: boolean;
  noshowPlatformServicesOnBooklet: boolean;
  noshowBedsDetail: boolean;
  showGuestInventory: boolean;
  // noCustomLayout: boolean;
  customLayout: boolean;
  noAudioDisplay: boolean;
  allowPets: boolean;
  messageBirdWidgetId: string;
  checkInWorking: string;
  nbDaysToShowDepositLink: number;

  checkInOnline: boolean;
  mandatorySetupStay: boolean;
  noOnlineCheckinValidation: boolean;
  checkinOnlineWithContract: boolean;

  afterMaxOnlineValidationTime: boolean;

}
export class CoHostInCharge {
  teammateId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  phoneUrgencyOnly: boolean;
  pictureUrl: string;
  languages: string[];
  whatsAppLink: string;
}
