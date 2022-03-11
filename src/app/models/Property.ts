import {Photo} from './Photo';
import {Poi} from './Poi';
import {Guide} from './Guide';
import {UsefulNumber} from './UsefulNumber';
import {Person} from './Person';

export class Property {
  id: any;
  photos: Photo[];
  title: string;
  poi: Poi;
  description: string;
  guides: Guide[];
  usefulNumbers: UsefulNumber[];
  teammates: Person[];
  hosts: Person[];
  // owners: PropertyOwner[];
  fullAddress: string;

  bedrooms: number;
  bathrooms: number;

  defaultCheckInTime: string;
  defaultCheckOutTime: string;

  doubleBeds: number;
  sofaBeds: number;
  singleBeds: number;
  babyBeds: number;
  numberOfFloors: number;

  // DD 01/09/2021 Add matterPortUrl for the Booklet
  matterportUrl: string;

  // DD : 02/09/2021 For Simon Colmar Pre Check needed
  needPreCheck: boolean;
  canEarlyCheck: boolean;

  noshowRecommendationOnBooklet: boolean;
  noshowHygieneOnBooklet: boolean;
  showGuestInventory: boolean;
  noCustomLayout: boolean;

  checkInOnline: boolean;
  mandatorySetupStay: boolean;
  noOnlineCheckinValidation: boolean;
  checkinOnlineWithContract: boolean;

  afterMaxOnlineValidationTime: boolean;
}


export class PropertyOwner {
  hostId: string;
  hostType: string;
}
