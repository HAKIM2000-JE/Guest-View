import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CheckNote} from '../../../models/guestview/BookingForGuest';
import {MatDialog} from '@angular/material';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../core/http/api.service';
import {takeUntil} from 'rxjs/operators';
import {GuestService} from '../../../core/services/guest.service';
import {LanguageManagementService} from '../../../core/services/language.service';
import {AbstractWindow} from '../../../core/abstract/AbstractWindow';
import {IntercomService} from '../../../core/services/IntercomService';
import {SharedSnackbarService} from '../../../shared/components/shared-snackbar/services/shared-snackbar.service';
import {TranslateService} from '@ngx-translate/core';
import {UtilsService} from '../../../core/services/utils.service';
import {DocumentUploadTypes, YaagoDocument} from '../../../models/YaagoDocument';
import {DeletePhotoComponent} from './delete-photo/delete-photo.component';
import {SharedSnackbarComponent} from "../../../shared/components/shared-snackbar/shared-snackbar.component";
import {SnackbarMessage} from "../../../shared/components/shared-snackbar/models/snackbar-message";


@Component({
  selector: 'app-guest-inventory',
  templateUrl: './guest-inventory.component.html',
  styleUrls: ['./guest-inventory.component.scss']
})
export class GuestInventoryComponent extends AbstractWindow implements OnInit {

  formInventoryCheckIn: FormGroup;
  formInventoryCheckOut: FormGroup;

  bookingId: string;
  inventoryCheckIn: CheckNote = new CheckNote();
  inventoryCheckOut: CheckNote = new CheckNote();

  photosIn = [];
  photosOut = [];
  videosIn = [];
  videosOut = [];
  urlsPhotos = [];
  showSpinner : boolean = false;
  public config: PerfectScrollbarConfigInterface = {};
  allowedImages = DocumentUploadTypes.images();
  allowedVideos = DocumentUploadTypes.videos();
  message: string;

  constructor(private route: ActivatedRoute,
              public intercomService: IntercomService,
              private snackbar: SharedSnackbarService,
              private translate: TranslateService,
              public utilService: UtilsService,
              private api: ApiService,
              private guestService: GuestService,
              private fb: FormBuilder,
              private languageService: LanguageManagementService,
              public dialog: MatDialog) {
    super(intercomService, utilService);
  }

  ngOnInit() {
    this.formInventoryCheckIn = this.fb.group({
      comment: ['', [Validators.required] ]
    });
    this.formInventoryCheckOut = this.fb.group({
      comment: ['', [Validators.required] ]
    });


    this.route.paramMap.subscribe( ParamMap => {
      this.bookingId = ParamMap.get('bookingId');

      this.guestService.getPropertyAndBookingForGuest( this.bookingId , this.languageService.getLanguageInUrl()).pipe(takeUntil(this.onDestroy)).subscribe( res => {
        if (res.booking.guestInventoryCheckOut != null) {
          this.inventoryCheckOut = res.booking.guestInventoryCheckOut;
          this.photosOut = this.inventoryCheckOut.pictures;
          this.videosOut = this.inventoryCheckOut.videos;
        }
        if (res.booking.guestInventoryCheckIn != null) {
          this.inventoryCheckIn = res.booking.guestInventoryCheckIn;
          this.photosIn = this.inventoryCheckIn.pictures;
          this.videosIn = this.inventoryCheckIn.videos;
        }
        console.log('photoIn', this.photosIn);
      });

    });

  }

  onPictureOutUploaded(doc: YaagoDocument) {
    if (!this.photosOut) {
      this.photosOut = [];
    }
    this.photosOut.push(doc.url);
  }
  onPictureInUploaded(doc: YaagoDocument) {
    if (!this.photosIn) {
      this.photosIn = [];
    }
    this.photosIn.push(doc.url);
  }

  onVideoInUploaded(doc: YaagoDocument) {
    if (!this.videosIn) {
      this.videosIn = [];
    }
    this.videosIn.push(doc.url);
  }

  onVideoOutUploaded(doc: YaagoDocument) {
    if (!this.videosOut) {
      this.videosOut = [];
    }
    this.videosOut.push(doc.url);
  }

  validate(type: string) {
    if (type === 'checkin') {
      this.inventoryCheckIn.pictures = this.photosIn;
      this.inventoryCheckIn.videos = this.videosIn;
      this.api.guestInventoryCheck(type, this.inventoryCheckIn, this.bookingId).subscribe(p => {
        this.snackbar.push(new SnackbarMessage(this.translate.instant('guest-inventory.success'), 'info'));
      }, err => {
        this.snackbar.push(new SnackbarMessage(this.translate.instant('guest-inventory.error'), 'error'));
      });
    } else {
      this.inventoryCheckOut.pictures = this.photosOut;
      this.inventoryCheckOut.videos = this.videosOut;
      this.api.guestInventoryCheck(type, this.inventoryCheckOut, this.bookingId).subscribe(p => {
        this.snackbar.push(new SnackbarMessage(this.translate.instant('guest-inventory.success'), 'info'));
      }, err => {
        this.snackbar.push(new SnackbarMessage(this.translate.instant('guest-inventory.error'), 'error'));
      });
    }
  }

  showDialog(index, type: string){
      const dialogRef = this.dialog.open(DeletePhotoComponent, {
        data: {index: index, photos: (type === 'in') ? this.photosIn : this.photosOut, urlsPhotos: this.urlsPhotos},
      });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result);
        this.urlsPhotos = result.urlsPhotos;
        console.log("urlsPhotos",this.urlsPhotos);

      }
    });
  }


  deleteVideoIn(i: number) {
    this.videosIn.splice(i, 1);
  }

  deleteVideoOut(i: number) {
    this.videosOut.splice(i, 1);
  }
}
