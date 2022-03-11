import {Component, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {GuestToppageComponent} from '../guest-toppage.component';
import {InternalPropertyService} from '../../../../core/services/internal.property.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilsService} from '../../../../core/services/utils.service';
import {TranslateService} from '@ngx-translate/core';
import { MatDialog } from '@angular/material';
import {Photo} from '../../../../models/Photo';
import {GuestService} from '../../../../core/services/guest.service';
import {Observable, Subject} from 'rxjs';
import {PropertyAndBookingForGuestDto} from '../../../../models/guestview/PropertyAndBookingForGuestDto';
import {takeUntil} from 'rxjs/operators';
import {SharedSnackbarService} from '../../../../shared/components/shared-snackbar/services/shared-snackbar.service';
import {slideOutAnimationLeft} from '../../../../shared/animations/slideOutAnimation';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-guest-toppage-mobile',
  templateUrl: './guest-toppage-mobile.component.html',
  styleUrls: ['./guest-toppage-mobile.component.scss'],
  animations: [
    slideOutAnimationLeft
  ]
})
export class GuestToppageMobileComponent extends GuestToppageComponent implements OnChanges, OnDestroy {

  private onDestroy = new Subject();
  _hasNext: boolean;
  _hasPrevious: boolean;
  index = 0;
  $closeWords: Observable<PropertyAndBookingForGuestDto>;

  constructor(
    private guestService: GuestService,
    private snackbar: SharedSnackbarService,
    public propertyService: InternalPropertyService,
    public route: ActivatedRoute,
    public translateService: TranslateService,
    public utilService: UtilsService,
    public router: Router,
    public dialog: MatDialog, public sanitizer: DomSanitizer) {
    super(propertyService, route, translateService, utilService, router, dialog, sanitizer);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes.property && changes.property.currentValue) {
      this._hasNext = this.hasNext();
      this._hasPrevious = this.hasPrevious();
      this.index = this.getPhotoIndex(this.property.photos, this.mainPropertyPhoto);
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  hasNext(): boolean {
    let ret = false;
    if (this.property && this.property.photos
      && this.property.photos.length > 0 && this.mainPropertyPhoto) {
      const index = this.getPhotoIndex(this.property.photos, this.mainPropertyPhoto);
      ret = index !== this.property.photos.length - 1;
    }
    return ret;
  }

  hasPrevious(): boolean {
    let ret = false;
    if (this.property && this.property.photos
      && this.property.photos.length > 0 && this.mainPropertyPhoto) {
      const index = this.getPhotoIndex(this.property.photos, this.mainPropertyPhoto);
      ret = index > 0;
    }
    return ret;
  }

  next() {
    if (this._hasNext) {
      this.index++;
      this.mainPropertyPhoto = this.property.photos[this.index].url.replace('?aki_policy=medium', '?aki_policy=large');
      this._hasNext = this.hasNext();
      this._hasPrevious = this.hasPrevious();
    }
  }

  previous() {
    if (this._hasPrevious) {
      this.index--;
      this.mainPropertyPhoto = this.property.photos[this.index].url.replace('?aki_policy=medium', '?aki_policy=large');
      this._hasNext = this.hasNext();
      this._hasPrevious = this.hasPrevious();
    }
  }

  closeHostWord() {
    if (!this.$closeWords) {
      this.$closeWords = this.guestService.closeDisplayWords(this.bookingId).pipe(takeUntil(this.onDestroy));
    }
    this.$closeWords.subscribe(ret => {
      this.booking.hostWordsDisplayed = ret.booking.hostWordsDisplayed;
      this.bookingChange.emit(this.booking);
    }, error => {
      // If an error occured hide the dialog but it will be reshown on next reload.
      this.booking.hostWordsDisplayed = true;
      this.bookingChange.emit(this.booking);
    });
  }

  private getPhotoIndex(photos: Photo[], photoUrl: string) {
    if (photos && photoUrl) {
      const fPhoto = photoUrl.replace('?aki_policy=large', '?aki_policy=medium');
      return photos.findIndex(p => p.url.startsWith(fPhoto));
    } else {
      return -1;
    }
  }

}
