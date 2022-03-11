export class PlatformAffiliateServices {
  id: string;
  name: string;
  logoUrl: string ;
  destination: string;
  translations: AffiliateTranslation[];
}
export class AffiliateTranslation {
  language: string;
  description: string;
  webSiteUrl: string;
  logoUrl: string;

}
