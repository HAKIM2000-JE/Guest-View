import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GuestService} from "../../../../../core/services/guest.service";
import {PropertyForGuest} from "../../../../../models/guestview/PropertyForGuest";
import {TranslateService} from '@ngx-translate/core';
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {LanguageManagementService} from "../../../../../core/services/language.service";

@Component({
  selector: 'app-guest-property-gallery-photo',
  templateUrl: './guest-property-gallery-photo.component.html',
  styleUrls: ['./guest-property-gallery-photo.component.scss']
})
export class GuestPropertyGalleryPhotoComponent implements OnInit , OnDestroy {
  private onDestroy = new Subject();

  property: PropertyForGuest;
  bookingId;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private translateService: TranslateService,
              private guestService: GuestService,
              private languageService: LanguageManagementService) {
  }

  ngOnInit() {

    this.route.params.subscribe(param => {
      if (param.bookingId) {
        this.bookingId = param.bookingId;
        this.guestService.getPropertyAndBookingForGuest(param.bookingId, this.languageService.getLanguageInUrl()).pipe(takeUntil(this.onDestroy)).subscribe(p => {
          if (p.property) {
            this.property = p.property;
          }
        }, err => {
          console.log('there is an error');
          this.router.navigate(['/misc/lost']);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
