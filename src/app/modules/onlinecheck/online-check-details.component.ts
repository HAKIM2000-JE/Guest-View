import { AfterViewInit, Component, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatStepper } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import SignaturePad from 'signature_pad';
import { GuestService } from 'src/app/core/services/guest.service';
import { LanguageManagementService } from 'src/app/core/services/language.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { BookingForGuest } from 'src/app/models/guestview/BookingForGuest';
import { Corporate } from 'src/app/models/guestview/Corporate';
import { PropertyForGuest } from 'src/app/models/guestview/PropertyForGuest';
import { YaagoDocument } from 'src/app/models/Guide';
import { DocumentUploadTypes } from 'src/app/models/YaagoDocument';
import { DeletePhotoComponent } from '../guest/guest-inventory/delete-photo/delete-photo.component';

@Component({
  selector: 'app-online-check-details',
  templateUrl: './online-check-details.component.html',
  styleUrls: ['./online-check-details.component.scss']
})
export class OnlineCheckDetailsComponent implements OnInit, AfterViewInit  {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  signaturePad: any;
  canvas: any;

  booking: BookingForGuest;
  bookingId: string;
  property: PropertyForGuest;

  onDestroy = new Subject();
  proofOfIdentity = [];
  proofOfIdentityy = [];
  urlsPhotos = [];
  allowedImages = DocumentUploadTypes.images();
  showSpinner: boolean;
  message: string;
  currentLang: string;
  checkin : any
  checkout : any
  screenWidth: number;

 corporate: Corporate;
  
  public config: PerfectScrollbarConfigInterface = {};

  constructor(public languageService: LanguageManagementService,
             public route: ActivatedRoute,
             public dialog: MatDialog,
              public guestService: GuestService,
              public translateService: TranslateService,
              public fb: FormBuilder,
              public utilService: UtilsService) {  
                this.getScreenWidth()}


  ngOnInit() {
    this.route.paramMap.subscribe( ParamMap => {
      this.bookingId = ParamMap.get('bookingId');
      this.guestService.getPropertyAndBookingForGuest(this.bookingId, this.languageService.getLanguageInUrl()).pipe(takeUntil(this.onDestroy)).subscribe(res => {
        this.property = res.property;
        this.booking = res.booking;
        this.corporate = res.corporate
        console.log('prop',res.property)
        console.log('book',res.booking)
        console.log('corp',res.corporate)
      });
    });
  
  }
  ngAfterViewInit(){

  }

isDesktopMode(): boolean {
  return this.utilService.isDesktop(this.screenWidth);
}
@HostListener("window:resize", ["$event"])
getScreenWidth(event?) {
  this.screenWidth = window.innerWidth;
}
}

