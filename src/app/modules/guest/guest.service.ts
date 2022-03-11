import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {BookingForGuest} from "../../models/guestview/BookingForGuest";
import {Guide} from "../../models/Guide";
import {Property} from "../../models/Property";
import {PropertyForGuest} from "../../models/guestview/PropertyForGuest";

@Injectable({
  providedIn: 'root'
})
export class GuestServiceIntern {

  private currentGuideId = new BehaviorSubject<string>(null);
  private  bookingForGuest = new BehaviorSubject<BookingForGuest>(null);
  private  propertyForGuest = new BehaviorSubject<PropertyForGuest>(null);
  private  guidesList = new BehaviorSubject<Guide[]>(null);
  private  guidesDetail = new BehaviorSubject<Guide[]>(null);
  private  guidesOneDetail = new BehaviorSubject<Guide>(null);
  private  activeGuideIndex = new BehaviorSubject<number>(null);
  private  listGuidePhotos = new BehaviorSubject<[]>(null);

  currentGuideId$ = this.currentGuideId.asObservable();
  bookingForGuest$ = this.bookingForGuest.asObservable();
  propertyForGuest$ = this.propertyForGuest.asObservable();
  guidesList$ = this.guidesList.asObservable();
  guidesDetail$ = this.guidesDetail.asObservable();
  guidesOneDetail$ = this.guidesOneDetail.asObservable();
  activeGuideIndex$ = this.activeGuideIndex.asObservable();
  listGuidePhotos$ = this.listGuidePhotos.asObservable();


  constructor() { }

  setCurrentGuideId(value:string ) {
    this.currentGuideId.next(value);
  }
  getCurrentGuideId() {
    return this.currentGuideId$;
  }

  setBookingForGuest(value:BookingForGuest ) {
    this.bookingForGuest.next(value);
  }
  getBookingForGuest() {
    return this.bookingForGuest$
  }

  setPropertyForGuest(value: PropertyForGuest ) {
    this.propertyForGuest.next(value);
  }
  getPropertyForGuest() {
    return this.propertyForGuest$;
  }

  setGuidesList(value: Guide[] ) {
    this.guidesList.next(value);
  }
  getGuidesList() {
   return this.guidesList$;
  }

  setGuideDetail(value: Guide[] ) {
    this.guidesDetail.next(value);
  }
  getGuideDetail() {
    return  this.guidesDetail$;
  }

  setGuideOneDetail(value: Guide ) {
    this.guidesOneDetail.next(value);
  }
  getGuideOneDetail() {
    return  this.guidesOneDetail$;
  }

  setGuidePhotos(value: any ) {
    this.listGuidePhotos.next(value);
  }
  getGuidePhotos() {
    return  this.listGuidePhotos;
  }
  setActiveGuideIndex(value: number){
    this.activeGuideIndex.next(value)
  }

  getActiveGuideIndex(){
    return this.activeGuideIndex$
  }
}
