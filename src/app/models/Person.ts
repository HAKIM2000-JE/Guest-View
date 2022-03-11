export class Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pictureUrl: string;
  host: HostData;
  btobInfo: BtobInfo;
  subscriptionForLivretSeul: boolean;
}
export class HostData {
  introduction: string;
  eliteHost = false;
  eliteHostSince: string;
  airbnb: HostAirbnbData;
  includeCommunityRecommendation: boolean;
  paymentMethodSetup: boolean;
}
export class BtobInfo {
    companyName: string;
    matterportUrl: string;
    logoUrl: string;
}
export class HostAirbnbData {
  email: string;
  password: string;
  token: string;
  userId: string;
  superHost: boolean;
  responseRate: number;
  responseTime: string;
  reviewCount: number;
  guideBooksCount: number;
  luxuryHost: boolean;
  businessEmployee: boolean;
  proHostExperience: boolean;
  lastSync: string;
  pictureUrl: string;
}

