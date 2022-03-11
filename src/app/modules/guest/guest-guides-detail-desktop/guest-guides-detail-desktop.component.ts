import { Component, OnInit } from '@angular/core';
import {GuestServiceIntern} from '../guest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilsService} from '../../../core/services/utils.service';
import {GuestPropertyGuidesDesktopComponent} from '../guest-property-guides/desktop/guest-property-guides-desktop.component';
import {GuestService} from '../../../core/services/guest.service';
import {CategoryGuide} from '../../../models/Guide';
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {LanguageManagementService} from "../../../core/services/language.service";
import {TranslateService} from '@ngx-translate/core';
import {ButtonType} from '../../../shared/components/button/button.component';
import {Icons} from '../../../models/icons';
import {GuestGalleryDetailComponent} from '../../../shared/components/guest-gallery-detail/guest-gallery-detail.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-guest-guides-detail-desktop',
  templateUrl: './guest-guides-detail-desktop.component.html',
  styleUrls: ['../guest-property-guides/desktop/guest-property-guides-desktop.component.scss', './guest-guides-detail-desktop.component.scss']
})
export class GuestGuidesDetailDesktopComponent extends GuestPropertyGuidesDesktopComponent implements  OnInit{

  // UI
  ButtonType: typeof ButtonType = ButtonType;
  Icons: typeof Icons = Icons;

  synthesis = window.speechSynthesis;
  urlLang: string;
  photos: object[] = [];
  constructor( public guideServiceIntern: GuestServiceIntern,
               public router: Router,
               public route: ActivatedRoute,
               public utilService: UtilsService,
               public guestService: GuestService,
               public languageService: LanguageManagementService,
               private translateService: TranslateService,
               public dialog: MatDialog) {
    super(guideServiceIntern, router, route, utilService, guestService, languageService, dialog);
  }

  ngOnInit() {
    super.ngOnInit();
   /* this.guestService.getCurrentLanguageUrl().subscribe(lang => {
      this.getBookingDetails(lang);
    });*/
    /*this.route.queryParamMap.subscribe(params => {
      this.urlLang = params[`params`].lang ? params[`params`].lang : navigator.language;
      this.translateService.use(this.urlLang);
      this.translateService.currentLang = this.urlLang;

      console.log("lang:", this.urlLang);
      console.log("lang:", this.translateService.currentLang);

    });
    this.translateService.use(this.urlLang);*/

    this.route.paramMap.subscribe(params => {
      this.bookingId =  params.get('bookingId');
      // this.getBookingDetails(this.translateService.currentLang);
    });
    this.guideServiceIntern.getGuideOneDetail().subscribe(data => {
      if (data) {
        this.defaultGuide = data;

        if (this.defaultGuide && this.defaultGuide.pictureUrls && this.defaultGuide.pictureUrls.length > 0) {
          this.defaultGuide.pictureUrls.forEach( photo => {
            // this.photos.push(photo.url.replace('aki_policy=medium', '').replace('aki_policy=large', ''));
            this.photos.push({
              caption: '',
              img: photo.replace('aki_policy=medium', '').replace('aki_policy=large', '')
            });
          });
        }

      }
    });
  }


  getBookingDetails(lang: string) {
    this.guestService.getPropertyAndBookingForGuest(this.bookingId, lang).pipe(takeUntil(this.onDestroy)).subscribe(data => {
      if (data) {
        this.property = data.property;
        this.guides = this.property.guides;

        if (this.guides && this.guides.length > 0) {

          const tempGuides = [];
          if (this.guides.find(g => g.category === CategoryGuide.ORIENTATION )) {
            tempGuides.push(this.guides.find(g => g.category === CategoryGuide.ORIENTATION));
          }
          if (this.guides.find(g => g.category === CategoryGuide.PARKING   )) {
            tempGuides.push(this.guides.find(g => g.category === CategoryGuide.PARKING));
          }
          if (this.guides.find(g => g.category === CategoryGuide.CHECKIN )) {
            tempGuides.push(this.guides.find(g => g.category === CategoryGuide.CHECKIN));
          }
          if (this.guides.find(g => g.category === CategoryGuide.WIFI )) {
            tempGuides.push(this.guides.find(g => g.category === CategoryGuide.WIFI));
          }
          if (this.guides.find(g => g.category === CategoryGuide.RULES )) {
            tempGuides.push(this.guides.find(g => g.category === CategoryGuide.RULES));
          }
          if (this.guides.find(g => g.category === CategoryGuide.APPLIANCES )) {
            tempGuides.push(this.guides.find(g => g.category === CategoryGuide.APPLIANCES));
          }
          if (this.guides.find(g => g.category === CategoryGuide.HEATING )) {
            tempGuides.push(this.guides.find(g => g.category === CategoryGuide.HEATING));
          }
          if (this.guides.find(g => g.category === CategoryGuide.OTHER)) {
            tempGuides.push(this.guides.find(g => g.category === CategoryGuide.OTHER));
          }
          if (this.guides.find(g => g.category === CategoryGuide.TRASH )) {
            tempGuides.push(this.guides.find(g => g.category === CategoryGuide.TRASH));
          }
          if (this.guides.find(g => g.category === CategoryGuide.CHECKOUT )) {
            tempGuides.push(this.guides.find(g => g.category === CategoryGuide.CHECKOUT));
          }

          const listOfGuideGroup = tempGuides.reduce((r, a) => {
            r[a.category] = [...r[a.category] || [], a];
            return r;
          }, {});

          this.guides = Object.entries(listOfGuideGroup);
          if (!this.defaultGuide) {
            this.defaultGuide = tempGuides.find(t => t.id === this.guides[0][1].id);

            if (this.defaultGuide && this.defaultGuide.pictureUrls) {
              this.defaultGuide.pictureUrls.forEach( photo => {
                // this.photos.push(photo.url.replace('aki_policy=medium', '').replace('aki_policy=large', ''));
                this.photos.push({
                  caption: '',
                  img: photo.replace('aki_policy=medium', '').replace('aki_policy=large', '')
                });
              });
            }
          }
          console.log(this.guides);
        }

      }
    });
  }

  getNameOfPdf(link) {
    const namesSplit = link.split('/');
    return namesSplit[namesSplit.length - 1];
  }
  goToGuideGallery(photos) {
    this.guideServiceIntern.setGuidePhotos(photos);
    this.guideServiceIntern.setGuideOneDetail(this.defaultGuide);
    this.router.navigate(['/guest/' + this.bookingId + '/guide-detail-photo/']);
  }

  showImgDialog(image){
    console.log('myphotos', this.photos);
    const dialogRef = this.dialog.open(GuestGalleryDetailComponent, {
      panelClass: 'custom-dialog-container',
      width: "1016px",
      height: "747px",
      autoFocus: false,
      data: { index: 0, myPhotos: this.photos},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result);
      }
    });
  }


}
