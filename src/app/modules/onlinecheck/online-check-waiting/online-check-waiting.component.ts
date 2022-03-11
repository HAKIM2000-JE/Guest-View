import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GuestService } from 'src/app/core/services/guest.service';
import { LanguageManagementService } from 'src/app/core/services/language.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { BookingForGuest } from 'src/app/models/guestview/BookingForGuest';
import { Corporate } from 'src/app/models/guestview/Corporate';
import { PropertyForGuest } from 'src/app/models/guestview/PropertyForGuest';
import { OnlineCheckDetailsComponent } from '../online-check-details.component';

@Component({
  selector: 'app-online-check-waiting',
  templateUrl: './online-check-waiting.component.html',
  styleUrls:  ['./online-check-waiting.component.scss','../desktop-online-check-details/desktop-online-check-details.component.scss'] 
})
export class OnlineCheckWaitingComponent extends  OnlineCheckDetailsComponent implements OnInit {
  booking: BookingForGuest;
  bookingId: string;
  property: PropertyForGuest;
  
  currentLang: string;
  onDestroy = new Subject();
  @Input() corporate: Corporate;
  constructor(public languageService: LanguageManagementService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public guestService: GuestService,
    public translateService: TranslateService,
    public fb: FormBuilder,
    public utilService: UtilsService) {
      super(languageService,route, dialog,guestService, translateService, fb, utilService );
     }

  ngOnInit() {

    this.route.paramMap.subscribe( ParamMap => {
      this.bookingId = ParamMap.get('bookingId');
      this.guestService.getPropertyAndBookingForGuest(this.bookingId, this.languageService.getLanguageInUrl()).pipe(takeUntil(this.onDestroy)).subscribe(res => {
        this.property = res.property;
        this.booking = res.booking;
        this.corporate = res.corporate
        

      
      });
    });
  }

}
