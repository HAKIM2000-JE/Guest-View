export class Guide {
  guideId: string;
  category: string;
  categoryLevel: number = 0;
  pictureUrls: string[];
  accessibleOnlyDuringStay: boolean;
  translations: GuideTranslation[];
  videoUrls: string[];
  documents: YaagoDocument[];
  videos: YaagoDocument[];
  externalLinks: YaagoDocument[];
  showAsImportantInfo: boolean;
  partnerName: string;
  partnerType: string

  newCategoryDisplay: string;
}

export class GuideTranslation {
  language: string;
  description: string;
  pdf: string[];
  video: string;
  title: string;
  wifiSecurityProtocol: string;
  wifiHidden: boolean;
  partnerName: string;
  partnerType: string;
}


export class CategoryGuide {
  static readonly CHECKIN = 'check-in';
  static readonly CHECKOUT = 'check-out';
  static readonly ORIENTATION = 'orientation';
  static readonly RULES = 'rules';
  static readonly SERVICES = 'services';
  static readonly WIFI = 'wifi';
  static readonly PARKING = 'parking';
  static readonly APPLIANCES = 'appliances';
  static readonly TRASH = 'trash';
  static readonly HEATING = 'heating';
  static readonly OTHER = 'other';

  static values(): any {
    return {
      orientation: CategoryGuide.ORIENTATION,
      parking: CategoryGuide.PARKING,
      checkin: CategoryGuide.CHECKIN,

      wifi: CategoryGuide.WIFI,
      rules: CategoryGuide.RULES,
      services: CategoryGuide.SERVICES,
      other: CategoryGuide.OTHER,

      appliances: CategoryGuide.APPLIANCES,
      heating: CategoryGuide.HEATING,
      trash: CategoryGuide.TRASH,

      checkout: CategoryGuide.CHECKOUT
    };
  }
}
export class YaagoDocument {
  url: string;
  type: DocType;
  title: string;
  description: string;
  date: string;

  constructor() {
  }
}

export enum DocType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  EXTERNAL_VIDEO = 'EXTERNAL_VIDEO',
  YOUTUBE = 'YOUTUBE',
  VIMEO = 'VIMEO',
  DAILYMOTION = 'DAILYMOTION',
  PDF = 'PDF',
  WORD = 'WORD',
  LINK = 'LINK'
}

export class CategoryGuides {
  category: string;
  guides: Guide[];
  custom: boolean;
  constructor() {
  }
}
