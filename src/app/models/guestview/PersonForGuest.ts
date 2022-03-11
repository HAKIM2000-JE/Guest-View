import {Corporate} from './Corporate';
import {BtobInfo} from '../Person';

export class PersonForGuest {
  id: string;
  corporate: Corporate;
  firstName: string;
  lastName: string;
  email: string;
  languages: string[];
  pictureUrl: string;
  superHost: boolean;
  phone: string;
  whatsAppLink: string;
  showMyDetails: boolean;
  includeCommunityRecommendation: boolean;
  btobInfo: BtobInfo;
  subscriptionForLivretSeul: boolean;
}
