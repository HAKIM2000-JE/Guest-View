import { Component, ViewChild } from '@angular/core';
import {InternalPropertyService} from '../../../../core/services/internal.property.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {UtilsService} from '../../../../core/services/utils.service';
import {GuestToppageComponent} from '../guest-toppage.component';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {TranslateService} from '@ngx-translate/core';
import { MatDialog } from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {fade} from '../../../../shared/animations/slideOutAnimation';

@Component({
  selector: 'app-guest-toppage-desktop',
  templateUrl: './guest-toppage-desktop.component.html',
  styleUrls: ['./guest-toppage-desktop.component.scss'],
  animations: [
    fade
  ]
})
export class GuestToppageDesktopComponent extends GuestToppageComponent {
  @ViewChild('owl', {static:true}) owl;
  scrolled: boolean =  false;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    nav: true,
    dotsEach: Math.floor(this.photos.length / 5),
    navSpeed: 700,
    dotsSpeed: 700,
    // center: true,
    // autoWidth:true,
    // autoHeight:true,
    margin: 23,
    items: 3,
    navText : [
      "<img src='../../../../../assets/icon/left-arrow-line-symbol.svg'>",
      "<img src='../../../../../assets/icon/left-arrow-line-symbol.svg'>"
    ],
    responsive: {
      940: {
        items: 4
      }
    },

  };
  constructor(
    public propertyService: InternalPropertyService,
    public route: ActivatedRoute,
    public translateService: TranslateService,
    public utilService: UtilsService,
    public router: Router,
    public dialog: MatDialog, public sanitizer: DomSanitizer) {
    super(propertyService, route, translateService, utilService,router,dialog, sanitizer);
  }

  isScrolled() {
    console.log('scrolled');
    this.scrolled = true;
  }
}
