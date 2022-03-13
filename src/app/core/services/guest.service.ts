import {Injectable} from '@angular/core';
import {ApiService} from '../http/api.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {PropertyAndBookingForGuestDto} from '../../models/guestview/PropertyAndBookingForGuestDto';
import {Recommendation} from '../../models/guestview/Recommendation';
import {Tags} from '../../models/guestview/Tags';
import {Property} from '../../models/Property';
import {PropertyForGuest} from '../../models/guestview/PropertyForGuest';
import {BookingForGuest} from "../../models/guestview/BookingForGuest";
import {Corporate} from "../../models/guestview/Corporate";
import {UpsaleCategoryAndProductDto} from "../../models/guestview/upsale/UpsaleCategoryAndProductDto";

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  isMap$ = new BehaviorSubject({value: null, property: null});
  cardDetails$  = new BehaviorSubject({recommendation: null, property: null});
  seeAllReviews$ = new BehaviorSubject({reviews: null, title: null});
  property$ = new BehaviorSubject(null);
  booking$ = new BehaviorSubject(null);
  miniCardDetails$  = new BehaviorSubject(null);
  corporate$ = new BehaviorSubject(null);
  upsaleCategoryAndProductDtos: UpsaleCategoryAndProductDto[] = [];

  openMiniCard(recommendation, property) {
    this.miniCardDetails$.next({recommendation, property});
  }

  closeMiniCard() {
    this.miniCardDetails$.next(null);
  }

  getMiniCard(): Observable<any> {
    return this.miniCardDetails$.asObservable();
  }


  constructor(private api: ApiService) { }
  showMap(value, property) {
    this.isMap$.next({value, property });
  }

  closeMap() {
    this.isMap$.next({value : false, property: null});
  }

  getStatusOfMap() {
    return this.isMap$.asObservable();
  }

  openCard(recommendation, property) {
    this.cardDetails$.next({recommendation, property});
  }

  closeCard() {
    this.cardDetails$.next({recommendation: null, property: null});
  }

  getStatusOfCard(): Observable<any> {
    return this.cardDetails$.asObservable();
  }

  openReviews(reviews, title) {
    this.seeAllReviews$.next({reviews, title});
  }

  closeReviews() {
    this.seeAllReviews$.next({reviews: null, title: null});
  }

  getStatusOfReviews(): Observable<any> {
    return this.seeAllReviews$.asObservable();
  }

  sendProperty(property: PropertyForGuest) {
    this.property$.next(property);
  }

  getProperty() {
    return this.property$.asObservable();
  }

  sendBooking(booking: BookingForGuest) {
    this.booking$.next(booking);
  }

  getBooking() {
    return this.booking$.asObservable();
  }

  sendupsaleCategoryAndProductDtos(upsales: UpsaleCategoryAndProductDto[]) {
    this.upsaleCategoryAndProductDtos = upsales;
  }

  getupsaleCategoryAndProductDtos() {
    return this.upsaleCategoryAndProductDtos;
  }

  sendCorporate(corporate: Corporate) {
    this.corporate$.next(corporate);
  }

  getCorporate() {
    return this.corporate$.asObservable();
  }


  getGuestBooking(bookingID: string, lang: string): Observable<any> {
    return this.api.getGuestBooking(bookingID, lang);
  }

  getPropertyAndBookingForGuest(bookingID: string, lang: string): Observable<PropertyAndBookingForGuestDto> {
    return this.api.getPropertyAndBookingForGuest(bookingID, lang);
  }
  
  getPropertyAndBookingForGuestCheck (propertyBookingId :string, type: string){
    return this.api.getPropertyAndBookingForGuestCheck(propertyBookingId, type);
  }

  closeDisplayWords(bookingId: string): Observable<PropertyAndBookingForGuestDto> {
    return this.api.closeDisplayWords(bookingId);
  }

  saveBooking(bookingID: string, booking) {
    return  this.api.saveBooking(bookingID, booking);
  }

  getListForceMajeurs(lang: string) {
    return  this.api.getForceMajeurs(lang);
  }

  getRecommendations(query: any, lang: string, personId?: string): Observable<Recommendation[]> {
    return this.api.getRecommendations(query, lang, personId);
  }

  getReviewsTranslated(recommendationId: any, lang: string): Observable<any[]> {
    return this.api.getTranslatedReviews(recommendationId, lang);
  }

  getTags(): Observable<Tags[]> {
    return this.api.getTags();
  }

  getClusterStyle() {
    return  [
      {
        textColor: 'white',
        url: './assets/icon/recommendation/marker-clustered.svg',
        height: 70,
        width: 70,
        textSize: 15
      },
      {
        textColor: 'white',
        url: './assets/icon/recommendation/marker-clustered.svg',
        height: 70,
        width: 70,
        textSize: 15
      },
      {
        textColor: 'white',
        url: './assets/icon/recommendation/marker-clustered.svg',
        height: 70,
        width: 70,
        textSize: 15
      },
      {
        textColor: 'white',
        url: './assets/icon/recommendation/marker-clustered.svg',
        height: 70,
        width: 70,
        textSize: 15
      },
      {
        textColor: 'white',
        url: './assets/icon/recommendation/marker-clustered.svg',
        height: 70,
        width: 70,
        textSize: 15
      }
    ];
  }


  likeRecommendation(bookingId: string, recommendationId: string): Observable<boolean> {
    return this.api.likeRecommendation(bookingId, recommendationId);
  }

  unlikeRecommendation(bookingId: string, recommendationId: string): Observable<boolean> {
    return this.api.unlikeRecommendation(bookingId, recommendationId);
  }

}
