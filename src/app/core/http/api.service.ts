import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ConfService} from '../services/conf.service';
import {Observable} from 'rxjs';
import {PropertyAndBookingForGuestDto} from '../../models/guestview/PropertyAndBookingForGuestDto';
import {BookingRating, PropertyRating} from '../../models/guestview/BookingRating';
import {Recommendation} from '../../models/guestview/Recommendation';
import {map} from 'rxjs/operators';
import {Tags} from '../../models/guestview/Tags';
import {LanguageManagementService} from '../services/language.service';
import {BookingForGuest, CheckNote} from '../../models/guestview/BookingForGuest';
import {MessageAudit} from '../../models/guestview/MessageAudit';
import {MessageCreationDto} from '../../models/guestview/MessageCreationDto';
import {BookletReviews} from '../../models/BookletReviews';
import {BookletReviewsLight} from '../../models/BookletReviewsLight';
import {UpsaleCategoryAndProductDto} from "../../models/guestview/upsale/UpsaleCategoryAndProductDto";
import {GuestOrder} from "../../models/guestview/upsale/GuestOrder";
import {ReturnUrl} from "../../models/ReturnUrl";
import {PropertyBooking} from "../../models/PropertyBooking";
import {CheckPassword} from "../../models/guestview/CheckPassword";


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private confService: ConfService,
    private languageService: LanguageManagementService
  ) {
  }

  static getHeaders(): { headers: HttpHeaders } {
    return {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  }

  static getOptionsWithParams(httpParams: HttpParams) {
    return {headers: new HttpHeaders({'Content-Type': 'application/json'}), params: httpParams};
  }

  static getHeadersForUpload(): { headers: HttpHeaders } {
    return {headers: new HttpHeaders()};
  }

  likeRecommendation(bookingId: string, recommendationId: string): Observable<boolean> {
    return this.http.get<boolean>(this.confService.getBackendApiEndPoint() + 'api-v2/guest/recommendation/like/'  + recommendationId + '/' + bookingId,
      ApiService.getHeaders());
  }

  unlikeRecommendation(bookingId: string, recommendationId: string): Observable<boolean> {
    return this.http.get<boolean>(this.confService.getBackendApiEndPoint() + 'api-v2/guest/recommendation/unlike/'  + recommendationId + '/' + bookingId,
      ApiService.getHeaders());
  }

  

  getGuestBooking(bookingID: string, lang: string): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('lang', lang);
    return this.http.get<any>(this.confService.getBackendApiEndPoint() + 'api-v2/guest/' + bookingID,
    ApiService.getOptionsWithParams(httpParams));
  }

  getPropertyAndBookingForGuest(bookingID: string, lang: string): Observable<PropertyAndBookingForGuestDto> {
    let httpParams = new HttpParams();
    if (lang) {
      httpParams = httpParams.set('lang', lang);
    }
    return this.http.get<PropertyAndBookingForGuestDto>(this.confService.getBackendApiEndPoint() + 'api-v2/guest/propertyAndBookingForGuest/' + bookingID,
    ApiService.getOptionsWithParams(httpParams));
  }

  getPropertyAndBookingForGuestCheck(propertyBookingId :string, type: string) {
    return this.http.get(this.confService.getBackendApiEndPoint() + 'api-v2/guest/propertyAndBookingForGuest/check/' + type +'/'+ propertyBookingId
    );
  }


  closeDisplayWords(bookingId: string): Observable<PropertyAndBookingForGuestDto> {
    return this.http.get<PropertyAndBookingForGuestDto>(this.confService.getBackendApiEndPoint() + 'api-v2/guest/propertyAndBookingForGuest/displayWords/' + bookingId, ApiService.getHeaders());
  }

  saveBooking(bookingID: string, booking): Observable<BookingForGuest> {
    return this.http.put<any>(this.confService.getBackendApiEndPoint() + 'api-v2/guest/confirmGuestInformations/' + bookingID, booking,
      ApiService.getHeaders());
  }

  savePropertyRating(bookingID: string, propertyRating: BookingRating): Observable<any> {
    return this.http.put<any>(this.confService.getBackendApiEndPoint() + 'api-v2/guest/ratingproperty/' + bookingID, propertyRating);
  }

  savePropertyRatingLivretSeul(propertyRating: PropertyRating): Observable<PropertyRating> {
    return this.http.post<any>(this.confService.getBackendApiEndPoint() + 'api-v2/property-rating', propertyRating);
  }

  saveTeammateRating(bookingID: string, teammateRating: BookingRating): Observable<any> {
    return this.http.put<any>(this.confService.getBackendApiEndPoint() + 'api-v2/guest/ratingteammate/' + bookingID, teammateRating,
      ApiService.getHeaders());
  }


  getForceMajeurs(lang: string): Observable<any> {
    let httpParams = new HttpParams();
    if (lang) {
      httpParams = httpParams.set('lang', lang);
    }
    return this.http.get<any>(this.confService.getBackendApiEndPoint() + 'api-v2/hygiene',
      ApiService.getOptionsWithParams(httpParams));
  }

  getRecommendations(query: any, lang: string, personId?: string): Observable<Recommendation[]> {
    let httpParams = new HttpParams();
    if (lang) {
      httpParams = httpParams.set('lang', lang);
    }
    return this.http.post<any>(this.confService.getBackendApiEndPoint() + 'api-v2/guest/recommendation/search',
      query, ApiService.getOptionsWithParams(httpParams))
      .pipe(
        map(
          res => {
            return res.result.map( rec => {
              return new Recommendation(rec, this.languageService.getLanguageInUrl(), personId);
            });
          },
          err => {
          }
        )
      );
  }
  getTranslatedReviews(recommendationId, lang: string): Observable<any[]> {
    let httpParams = new HttpParams();
    if (lang) {
      httpParams = httpParams.set('lang', lang);
    }
    return this.http.get<any[]>(this.confService.getBackendApiEndPoint() + 'api-v2/guest/recommendation/comments/' + recommendationId,
      ApiService.getOptionsWithParams(httpParams));
  }

  getTags(): Observable<Tags[]> {
    return this.http.get<Tags[]>(this.confService.getBackendApiEndPoint() + 'api-v2/tags', ApiService.getHeaders());
  }

  getEmptyHeadersForUpload(): { headers: HttpHeaders } {
    return { headers: new HttpHeaders()};
  }

  guestInventoryCheck(type: string, check: CheckNote, bookingId: string) : Observable<PropertyAndBookingForGuestDto> {
    return this.http.post<PropertyAndBookingForGuestDto>(this.confService.getBackendApiEndPoint() + 'api-v2/guest/inventory/' + type + '/' + bookingId, check);
  }

  sendMessage(bookingId: string, message: MessageCreationDto): Observable<MessageAudit> {
    return this.http.post<MessageAudit>(this.confService.getBackendApiEndPoint() + 'api-v2/messages/direct/' + bookingId, message);
  }

  getMessages(bookingId: string): Observable<MessageAudit[]> {
    return this.http.get<MessageAudit[]>(this.confService.getBackendApiEndPoint() + 'api-v2/messages/thread/' + bookingId);
  }

  leaveBookletReviews(bookingId: string, bookletReviewLight: BookletReviewsLight): Observable<BookletReviews> {
    return this.http.post<BookletReviews>(this.confService.getBackendApiEndPoint() + 'api-v2/booklet/reviews/' + bookingId, bookletReviewLight);
  }

  getUpsales(bookingID: string, lang: string): Observable<UpsaleCategoryAndProductDto[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('lang', lang);
    return this.http.get<UpsaleCategoryAndProductDto[]>(this.confService.getBackendApiEndPoint() + 'api-v2/upsale/' + bookingID,
      ApiService.getOptionsWithParams(httpParams));
  }

  saveGuestOrder(bookingId: string, guestOrder: GuestOrder): Observable<GuestOrder> {
    return this.http.post<GuestOrder>(this.confService.getBackendApiEndPoint() + 'api-v2/upsale/' + bookingId, guestOrder);
  }

  getCheckoutUrl(guestOrderId: string): Observable<ReturnUrl> {
    return this.http.get<ReturnUrl>(this.confService.getBackendApiEndPoint() + 'api-v2/upsale/getcheckout/' + guestOrderId);
  }

  getCheckPassword(checkPassword: CheckPassword): Observable<BookingForGuest> {
    return this.http.post<BookingForGuest>(this.confService.getBackendApiEndPoint() + 'api-v2/guest/pwd', checkPassword);
  }

  getLanguages() {
    return this.http.get<any>('/api/webconfiguration/getlanguages').pipe(
      map(response => <any>response));
  }

}
