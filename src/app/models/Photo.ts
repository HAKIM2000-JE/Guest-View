import { DescriptionTranslation } from "./guestview/DescriptionForGuest";

export class Photo {
  url: string;
  caption: string;
  main: boolean;
  descriptionTranslations?: DescriptionTranslation
}
