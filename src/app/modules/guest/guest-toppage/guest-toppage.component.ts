import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {GuestService} from '../../../core/services/guest.service';
import {InternalPropertyService} from '../../../core/services/internal.property.service';
import {Photo} from '../../../models/Photo';
import SwipeListener from 'swipe-listener';
import {UtilsService} from '../../../core/services/utils.service';
import {ImageService} from '../../../core/services/image.service';
import {PropertyForGuest} from '../../../models/guestview/PropertyForGuest';
import {BookingForGuest} from '../../../models/guestview/BookingForGuest';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { MatDialog } from '@angular/material';
import { GuestGalleryDetailComponent } from '../../../shared/components/guest-gallery-detail/guest-gallery-detail.component';
import { GuestPropertyGalleryComponent } from '../guest-property-gallery/guest-property-gallery.component';
import {ButtonType} from '../../../shared/components/button/button.component';
import {Icons} from '../../../models/icons';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {$$} from 'codelyzer/angular/styles/chars';
import {fade, slideOutAnimationLeft} from '../../../shared/animations/slideOutAnimation';
import {DocType} from "../../../models/Guide";

declare var google: any;
declare var MarkerClusterer: any;

@Component({
  selector: 'app-guest-toppage',
  templateUrl: './guest-toppage.component.html',
  styleUrls: ['./guest-toppage.component.scss'],
  animations: [
    fade
  ]
})
export class GuestToppageComponent implements  OnInit, OnChanges, AfterViewInit {

  state = 'in';
  currentImage: Photo;
  @Input() property: PropertyForGuest;
  @Input() booking: BookingForGuest;
  @Output() bookingChange = new EventEmitter<BookingForGuest>();
  photos: object[] = [];
  @ViewChild('gMap', null) gMapElement: any;
  @ViewChild('container', null) gContainerElement: any;
  public map: any;
  public markers = [];
  listStyleWith: any;
  desktopMode: false;
  screenWidth: number;
  urlSanitized: SafeResourceUrl;
  mainPropertyPhoto: string = null;
  DocType = DocType;

  // workaround
  currentLang: string;

  lat: number;
  long: number;
  slideIndex: number = 0;

  bookingId: string;


  navigationExtras: NavigationExtras = {
    state: {
      index: 0,
    }
  };

  // UI
  ButtonType: typeof ButtonType = ButtonType;
  Icons: typeof Icons = Icons;

  constructor(
              public propertyService: InternalPropertyService,
              public route: ActivatedRoute,
              public translateService: TranslateService,
              public utilService: UtilsService,
              public router: Router,
              public dialog: MatDialog, public sanitizer: DomSanitizer) {
    this.getScreenWidth();
  }

  ngOnInit() {


    /*setInterval(function(){ $$('.slideshow img').last().fade({
      duration: .3, afterFinish: function(e){ e.element.remove(); }
    }); }, 3000);*/





    if(this.property)
    /*navigator.geolocation.getCurrentPosition(position => {
      console.log('got geolocalisation');
      console.log(position);
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
    });*/
    this.route.params.subscribe( param => {
      console.log(param.bookingId);
      if (param.bookingId) {
        this.bookingId = param.bookingId;
      }
    });
    /*this.route.queryParams.subscribe(params => {
      if (params.lang) {
        console.log('LANGOSY', params.lang);
        this.currentLang = ['zh'].includes(params.lang) ? 'zh_cn' : params.lang ;
        this.translateService.use(params.lang);
      }
    });*/
    console.log(this.photos);

    this.initializeMainPhoto();
    this.initializePhotoSlider();

    if (this.property.photos.length > 1) {
      setInterval(() => {
        this.state = 'out';


        setTimeout(() => {
          if (this.property && this.property.photos) {
            this.slideIndex++;
            if (this.slideIndex >= this.property.photos.length) {
              this.slideIndex = 0
            }
          }
          this.currentImage = this.property.photos[this.slideIndex];
        }, 1000);
      }, 3000);
    }
  }


  ngAfterViewInit() {
    // this.showSlides();
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes.property && this.property) {
      console.log(this.property);
      console.log('getting Main Photo');
      this.initializeMainPhoto();
      if (this.property.poi) {
        const defaultBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(this.property.poi.y, this.property.poi.x));

        setTimeout(() => {
          this.loadMap();
        }, 0);
      }
    }
    if (this.property && this.property.photos.length > 0) {
      this.property.photos.forEach( photo => {
        // this.photos.push(photo.url.replace('aki_policy=medium', '').replace('aki_policy=large', ''));
        this.photos.push({
          caption: photo.caption,
          img: photo.url.replace('aki_policy=medium', '').replace('aki_policy=xx_large', '')
        });
      });

      this.listStyleWith = (240 * this.photos.length);
    }
  }

    //show dialog interface of deleting picture
    showImgDialog(image){
      const dialogRef = this.dialog.open(GuestGalleryDetailComponent, {
        panelClass: 'custom-dialog-container',
        width: "1016px",
        height: "747px",
        autoFocus: false,
        data: { index: this.photos.indexOf(image), myPhotos: this.photos},
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result){
          console.log(result);
        }
      });
    }


  getFormatDate(date: string) {
    return UtilsService.formatDateWithLocale(date, this.translateService.currentLang);
  }

  initializeMainPhoto() {
    this.currentImage = this.property.photos[0];
    if (this.propertyService.getMainPhotoUrl()) {
      this.mainPropertyPhoto = this.propertyService.getMainPhotoUrl().url.replace('aki_policy=medium', '').replace('aki_policy=xx_large', '');
    } else {
      this.mainPropertyPhoto = null;
    }
    if (this.mainPropertyPhoto) {
      if (this.propertyService.getMainPhotoUrl().url !== this.property.photos[0].url) {
        console.log('insert into photo array');
        this.property.photos.splice(0, 0, this.propertyService.getMainPhotoUrl());
      }
    }
    console.log("Property MainPhoto:", this.mainPropertyPhoto);
  }

  initializePhotoSlider() {
    const container = document.querySelector('#container');
    const listener = SwipeListener(container);
    if (container) {
      container.addEventListener('swipe', e => {
        // @ts-ignore
        const directions = e.detail.directions;
        // @ts-ignore
        const  x = e.detail.x;
        // @ts-ignore
        const y = e.detail.y;

        if (directions.left) {
          this.mainPropertyPhoto = this.propertyService.getPreviousPhoto().url.replace('aki_policy=medium', '').replace('aki_policy=xx_large', '');
        }

        if (directions.right) {
          this.mainPropertyPhoto = this.propertyService.getNextPhoto().url.replace('aki_policy=medium', '').replace('aki_policy=xx_large', '');
        }
      });
    }

  }

  /*handleImageUpload(event) {
    const imageFile = event.target.files[0];
    this.sizeBefore = `size before ${(imageFile.size / 1024 / 1024).toFixed(4)} MB`;

    this.imageService.handleImageUpload(event).subscribe( p => {
      console.log(p);
      this.sizeAfter = `size after ${(p.size / 1024 / 1024).toFixed(4)} MB`;
    });
  }*/

  loadMap() {
    if (!this.gMapElement) {
      this.gMapElement = document.getElementById('gMap');
    }
    if (!this.gMapElement) { return; }
    const element = this.gMapElement.nativeElement;

    this.markers = [];
    this.markers.push(this.createMarker());

    const mapProp = {
      center: new google.maps.LatLng(this.property.poi.y, this.property.poi.x),
      zoom: 15,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: false,
      scrollwheel: false
    };
    this.map = new google.maps.Map(element, mapProp);

    const myMarkerClusterer = new MarkerClusterer(this.map, this.markers, {
      maxZoom: 14, // maxZoom set when clustering will stop
      // styles: clusterStyles
      // imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' // './assets/images/mapicons/M'
    });
  }

  createMarker(): any {
    const property = {
      url: './assets/images/recommendation/marker-property.svg',
      size: new google.maps.Size(40, 40),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 41)
    };
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.property.poi.y, this.property.poi.x),
      icon: property,
      map: this.map,
      animation: google.maps.Animation.DROP
    });
    marker.setVisible(true);
    return marker;
  }

  findDirection() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        const currentGps = this.lat + ',' + this.long;
        const distGps = this.property.poi.y + ',' + this.property.poi.x;
        this.getDirection(currentGps, distGps);
      });
    }
  }

  getDirection(currentGps, distGps) {
    // document.location.href = 'https://www.google.com/maps/place/' + address;
    window.open(
      'https://www.google.com/maps/dir/' + currentGps + '/' + distGps,
      '_blank' // <- This is what makes it open in a new window.
    );
  }
  isDesktopMode(): boolean {
    return this.utilService.isDesktop(this.screenWidth);
  }

  @HostListener('window:resize', ['$event'])
  getScreenWidth(event?) {
    this.screenWidth = window.innerWidth;
  }

  transform(url): any {
    if (!this.urlSanitized) {
      this.urlSanitized = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return this.urlSanitized;
  }

  onDone($event) {
    this.state = 'in';
  }

  toggleState() {
    //this.state = this.state === 'in' ? 'out' : 'in';
  }

}
