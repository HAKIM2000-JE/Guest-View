import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {GuestPropertyGuidesComponent} from "../guest-property-guides.component";
import {GuestServiceIntern} from "../../guest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilsService} from "../../../../core/services/utils.service";
import {CategoryGuide, Guide} from "../../../../models/Guide";
import {GuestService} from "../../../../core/services/guest.service";
import {LanguageManagementService} from "../../../../core/services/language.service";
import {MatDialog} from '@angular/material';
import {GuestGalleryDetailComponent} from '../../../../shared/components/guest-gallery-detail/guest-gallery-detail.component';
import {BookingForGuest} from '../../../../models/guestview/BookingForGuest';

@Component({
  selector: 'app-guest-property-guides-desktop',
  templateUrl: './guest-property-guides-desktop.component.html',
  styleUrls: ['./guest-property-guides-desktop.component.scss']
})
export class GuestPropertyGuidesDesktopComponent extends GuestPropertyGuidesComponent {

  @Input() property;
  guides: any;
  photos = [];
  defaultGuide: Guide;
  lang: string;
  selectedIndex;
  constructor(public guideServiceIntern: GuestServiceIntern,
              public router: Router,
              public route: ActivatedRoute,
              public utilService: UtilsService,
              public guestService: GuestService,
              public languageService: LanguageManagementService,
              public dialog: MatDialog) {
    super(guideServiceIntern, router, route, utilService, guestService, languageService);
  }


  selectedGuide(guide) {
    this.defaultGuide = guide;
    this.photos = [];
    if (this.defaultGuide && this.defaultGuide.pictureUrls) {
      this.defaultGuide.pictureUrls.forEach(photo => {
        this.photos.push({
          caption: '',
          img: photo.replace('aki_policy=medium', '').replace('aki_policy=large', '')
        });
      });
    }
    console.log("selected:", this.defaultGuide);
  }
  /*getImageByCategory(category: CategoryGuide): string {
    let image;
    switch (category) {
      case CategoryGuide.APPLIANCES:
        image = '../../../../assets/images/list-guides/Appliance/Appliances.png';
        break;
      case CategoryGuide.CHECKIN:
        image = '../../../../assets/images/list-guides/Checkin/checkin.png';
        break;
      case CategoryGuide.CHECKOUT:
        image = '../../../../assets/images/list-guides/Check-out/checkout.png';
        break;
      case CategoryGuide.ORIENTATION:
        image = '../../../../assets/images/list-guides/Direction/dir.png';
        break;
      case CategoryGuide.RULES:
        image = '../../../../assets/images/list-guides/Rules/img@3x.png';
        break;
      case CategoryGuide.WIFI:
        image = '../../../../assets/images/list-guides/Wifi/wifi.png';
        break;
      case CategoryGuide.PARKING:
        image = '../../../../assets/images/list-guides/Parking/parking.png';
        break;
      case CategoryGuide.TRASH:
        image = '../../../../assets/images/list-guides/Trash/trash.png';
        break;
      case CategoryGuide.HEATING:
        image = '../../../../assets/images/list-guides/Heating/heater.png';
        break;
      case CategoryGuide.OTHER:
        image = '../../../../assets/images/list-guides/Other/questions.png';
        break;
      default: {
        image = '../../../../assets/images/list-guides/Appliance/Appliances.png';
      }
    }
    return image;
  }*/

  showImgDialog(image){
    if (this.photos.length > 0) {
      console.log('myphotos', this.photos);
      const dialogRef = this.dialog.open(GuestGalleryDetailComponent, {
        panelClass: 'custom-dialog-container',
        width: "1016px",
        height: "747px",
        autoFocus: false,
        data: {index: 0, myPhotos: this.photos},
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log(result);
        }
      });
    }
  }

  getCleanTextToRead() {
    if (!this.defaultGuide || !this.defaultGuide.translations || this.defaultGuide.translations.length === 0 || !this.defaultGuide.translations[0].description) {
      return;
    }
    let textToSpeech = this.defaultGuide.translations[0].description.replace(/<[^>]*>/g, ' ');
    textToSpeech = textToSpeech.replace(/&nbsp;/gi, ' ');
    // textToSpeech = textToSpeech.replace(/^https?:\/\/.*[\r\n]*/g, ' ');
    return textToSpeech;
  }

}
