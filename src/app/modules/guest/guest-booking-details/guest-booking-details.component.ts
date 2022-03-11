import {Component, HostListener, Input, OnChanges, OnInit, Sanitizer, SimpleChanges, ViewChild} from '@angular/core';
import {Property} from '../../../models/Property';
import {PropertyBooking} from '../../../models/PropertyBooking';
import {CoHostInCharge, PropertyForGuest} from '../../../models/guestview/PropertyForGuest';
import {BookingForGuest, TeammateInCharge} from '../../../models/guestview/BookingForGuest';
import {UtilsService} from '../../../core/services/utils.service';
import * as moment from 'moment';
import {PersonForGuest} from '../../../models/guestview/PersonForGuest';
import {TranslateService} from '@ngx-translate/core';
import {GuestService} from '../../../core/services/guest.service';
import {ClipboardService} from 'ngx-clipboard';
import {Recommendation} from '../../../models/guestview/Recommendation';
import {RecommendationForGuest} from '../../../models/guestview/RecommendationForGuest';
declare var google: any;
declare var MarkerClusterer: any;
import * as googleTTS from 'google-tts-api';
import {DomSanitizer} from '@angular/platform-browser';
import {InternalPropertyService} from '../../../core/services/internal.property.service';
import {CategoryGuide, DocType, Guide} from "../../../models/Guide";
import {installTempPackage} from "@angular/cli/tasks/install-package";
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Corporate} from "../../../models/guestview/Corporate";

@Component({
  selector: 'app-guest-booking-details',
  templateUrl: './guest-booking-details.component.html',
  styleUrls: ['./guest-booking-details.component.scss']
})
export class GuestBookingDetailsComponent implements OnInit, OnChanges {
  styledMapType;
  screenWidth: number;
  activePartner: string;
  fulldescription: any = false;
  mainPropertyPhoto: string = null;
  public localCoHostInCharge: CoHostInCharge = null;
  localShowMeAsHost = false;
  mapProp: any;
  constructor(public utilService: UtilsService,
              public translateService: TranslateService,
              public router: Router,
              public guestService: GuestService, public clipBoardSrv: ClipboardService, public sanitizer: DomSanitizer, public propertyService: InternalPropertyService) {
    this.getScreenWidth();
  }


  @Input() property: PropertyForGuest;
  @Input() booking: BookingForGuest;
  @Input() corporate: Corporate;
  @ViewChild('gMap', null) gMapElement: any;
  @ViewChild('mytemplate', null) mytmpl: any;
  guestToDisplay: string[] = [];
  nbGuest = 0;
  public map: any;
  public markers = [];
  synthesis = window.speechSynthesis;

  urlsAudioForDescription: any[] = [];

  lat: number;
  long: number;

  partnerToDisplay = 0;
  public iconMarkers: any;

  currentGuide: Guide;
  showGuideDetails = false;
  importantGuides: Guide[] = [];


  ngOnInit() {


    if (this.corporate != null && this.corporate.coHostInCharge != null) {
      this.localCoHostInCharge = this.corporate.coHostInCharge;
      this.localShowMeAsHost = this.corporate.showMeAsHost;
    } else if (this.property != null && this.property.coHostInCharge != null) {
      this.localCoHostInCharge = this.property.coHostInCharge;
      this.localShowMeAsHost = this.property.showMeAsHost;
    } else {
      this.localCoHostInCharge = null;
      this.localShowMeAsHost = false;
    }
    console.log("corporate", this.corporate);
    console.log("this.localCoHostInCharge", this.localCoHostInCharge);

    this.mapProp = {
      center: new google.maps.LatLng(this.property.poi.y, this.property.poi.x),
      zoom: 15,
      disableDefaultUI: true,
      // mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true,
      scrollwheel: false,
      styles:  [
        {
          featureType: 'poi.business',
          elementType: 'all',
          stylers: [
            { visibility: 'off' }
          ]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {
              visibility: 'on'
            },
            {
              saturation: 50
            },
            {
              gamma: 0
            },
            {
              hue: '#50a5d1'
            }
          ]
        },
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [
            {
              color: '#f5f5f5'
            },
            {
              lightness: 20
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#ffffff'
            },
            {
              lightness: 17
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#ffffff'
            },
            {
              lightness: 29
            },
            {
              weight: 0.2
            }
          ]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [
            {
              color: '#ffffff'
            },
            {
              lightness: 18
            }
          ]
        },
        {
          featureType: 'road.local',
          elementType: 'geometry',
          stylers: [
            {
              color: '#ffffff'
            },
            {
              lightness: 16
            }
          ]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [
            {
              color: '#dedede'
            },
            {
              lightness: 21
            }
          ]
        },
        {
          elementType: 'labels.text.stroke',
          stylers: [
            {
              visibility: 'on'
            },
            {
              color: '#ffffff'
            },
            {
              lightness: 16
            }
          ]
        },
        {
          elementType: 'labels.text.fill',
          stylers: [
            {
              saturation: 36
            },
            {
              color: '#333333'
            },
            {
              lightness: 40
            }
          ]
        },
        {
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [
            {
              color: '#f2f2f2'
            },
            {
              lightness: 19
            }
          ]
        },
        {
          featureType: 'administrative',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#fefefe'
            },
            {
              lightness: 20
            }
          ]
        },
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#fefefe'
            },
            {
              lightness: 17
            },
            {
              weight: 1.2
            }
          ]
        }
      ]
    };

    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
    });

    this.styledMapType = new google.maps.StyledMapType(
      [
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {
              color: '#e9e9e9'
            },
            {
              lightness: 17
            }
          ]
        },
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [
            {
              color: '#f5f5f5'
            },
            {
              lightness: 20
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#ffffff'
            },
            {
              lightness: 17
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#ffffff'
            },
            {
              lightness: 29
            },
            {
              weight: 0.2
            }
          ]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [
            {
              color: '#ffffff'
            },
            {
              lightness: 18
            }
          ]
        },
        {
          featureType: 'road.local',
          elementType: 'geometry',
          stylers: [
            {
              color: '#ffffff'
            },
            {
              lightness: 16
            }
          ]
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [
            {
              color: '#f5f5f5'
            },
            {
              lightness: 21
            }
          ]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [
            {
              color: '#dedede'
            },
            {
              lightness: 21
            }
          ]
        },
        {
          elementType: 'labels.text.stroke',
          stylers: [
            {
              visibility: 'on'
            },
            {
              color: '#ffffff'
            },
            {
              lightness: 16
            }
          ]
        },
        {
          elementType: 'labels.text.fill',
          stylers: [
            {
              saturation: 36
            },
            {
              color: '#333333'
            },
            {
              lightness: 40
            }
          ]
        },
        {
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [
            {
              color: '#f2f2f2'
            },
            {
              lightness: 19
            }
          ]
        },
        {
          featureType: 'administrative',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#fefefe'
            },
            {
              lightness: 20
            }
          ]
        },
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#fefefe'
            },
            {
              lightness: 17
            },
            {
              weight: 1.2
            }
          ]
        }
      ],
      { name: 'Styled Map' }
    );

    this.initRecPins();
  }
  ngOnChanges(changes: SimpleChanges): void {


    if (this.booking) {
      this.nbGuest = this.booking.adults + this.booking.children + this.booking.babies;
      if (this.nbGuest === 0) {
        this.nbGuest = 1;
      }
      for (let i = 0; i < (this.nbGuest - 2); i++) {
        this.guestToDisplay.push('new');
      }
      console.log('nbGuest:' + this.nbGuest);
      console.log("corporate", this.corporate);
    }

    if (this.corporate) {
      if (this.corporate != null && this.corporate.coHostInCharge != null) {
        this.localCoHostInCharge = this.corporate.coHostInCharge;
        this.localShowMeAsHost = this.corporate.showMeAsHost;
      } else if (this.property != null && this.property.coHostInCharge != null) {
        this.localCoHostInCharge = this.property.coHostInCharge;
        this.localShowMeAsHost = this.property.showMeAsHost;
      } else {
        this.localCoHostInCharge = null;
        this.localShowMeAsHost = false;
      }
    }

    if (changes.property && this.property) {
      console.log(this.property);
      if (this.property.poi) {
        const defaultBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(this.property.poi.y, this.property.poi.x));
        setTimeout(() => {
          this.loadMap();
        }, 0);
      }

      if (this.propertyService.getMainPhotoUrl()) {
        this.mainPropertyPhoto = this.propertyService.getMainPhotoUrl().url.replace('aki_policy=medium', '').replace('aki_policy=large', '');
      } else {
        this.mainPropertyPhoto = null;
      }

      if (this.property.guides && this.property.guides.length > 0) {
        this.importantGuides = this.property.guides.filter(item => item.showAsImportantInfo);
        console.log('IMPORTANT', this.importantGuides);
      }

      // get the AudioFile For Description
      /*this.urlsAudioForDescription = googleTTS.getAllAudioUrls(this.property.description, {
        lang: this.translateService.currentLang,
        slow: false,
        host: 'https://translate.google.com',
      });
      console.log('urlof the audio to play', this.urlsAudioForDescription);*/
    }
  }
  pause() {
    this.synthesis.pause();
  }
  resume() {
    this.synthesis.resume();
  }
  playDescription() {
    this.synthesis.cancel();
    const localLangue = this.translateService.currentLang;
    this.synthesis.getVoices().forEach( v => {
      console.log(v);
    })
    var voice = this.synthesis.getVoices().filter(function (voice) {
      return voice.lang.indexOf(localLangue) > 0;
    })[0];

    // Create an utterance object
    var utterance = new SpeechSynthesisUtterance(this.property.description);

    // Set utterance properties
    utterance.voice = voice;
    utterance.lang = localLangue;
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 0.8;


    console.log(utterance);

    // Speak the utterance
    this.synthesis.speak(utterance);


   /* const client = new textToSpeech.TextToSpeechClient();
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');

      var song1 = new Audio();
      var src1 = document.createElement("source");
      src1.type = "audio/mpeg";
      src1.src = this.urlsAudioForDescription[0].url;
      song1.appendChild(src1);
      song1.play();*/
  }

  readmore() {
    this.fulldescription = !this.fulldescription;
  }

  loadMap() {
    if (!this.gMapElement) {
      this.gMapElement = document.getElementById('gMap');
    }
    if (!this.gMapElement) { return; }
    const element = this.gMapElement.nativeElement;

    this.markers = [];
    if (this.property && this.property.recommendations && this.property.recommendations.length > 0) {
      this.property.recommendations.forEach(rec => {
        this.markers.push(this.createRecMarker(rec));
      });
    }

    this.markers.push(this.createMarker());



    this.map = new google.maps.Map(element, this.mapProp);

    // this.map.mapTypes.set("styled_map", styledMapType);
    // this.map.setMapTypeId("styled_map");

    const myMarkerClusterer = new MarkerClusterer(this.map, this.markers, {
      maxZoom: 14, // maxZoom set when clustering will stop
      // styles: clusterStyles
      // imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' // './assets/images/mapicons/M'
    });
  }
  createMarker(): any {
    const property = {
      url: './assets/images/recommendation/whh_placealt.svg',
      size: new google.maps.Size(60, 60),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(52, 60),
    };
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.property.poi.y, this.property.poi.x),
      icon: property,
      map: this.map,
      animation: google.maps.Animation.DROP,
    });

    const infowindow = new google.maps.InfoWindow({
      content: `<div class="markerLabel"> ${this.property.fullAddress}</div>`,
      pixelOffset: new google.maps.Size(150, 0)
    });

    marker.setVisible(true);
    infowindow.open(this.map, marker);
    return marker;
  }
  createRecMarker(r: any): any {
    const feature = {
      x: r.poi.x,
      y: r.poi.y,
      position: new google.maps.LatLng(r.poi.y, r.poi.x),
      address: r.fullAddress,
      myType: (r.yaagoReco) ? 'yaago_' + r.category : r.category,
      title: r.title,
      distance: r.distance,
      recommendation: r
    };
    const marker = new google.maps.Marker({
      position: feature.position,
      icon: this.iconMarkers[feature.myType] == null ? this.iconMarkers.recommendation  : this.iconMarkers[feature.myType].icon,
      map: this.map,
      recommendation: feature.recommendation
      // animation: google.maps.Animation.DROP
    });
    marker.setVisible(true);
    return marker;
  }

  getDay(date: string) {
    if (date) {
      return moment(date).format('D');
    } else {
      return '';
    }
  }
  getMonth(date: string) {
    if (date) {
      return moment(date).locale(this.translateService.currentLang).format('MMM');
    } else {
      return '';
    }
  }
  getTime(date: string, defaultDate: string) {
    if (date) {
      return moment(date, 'hh:mm:ss').format('HH:mm').replace(':', 'h');
    } else if (defaultDate) {
      return (moment(defaultDate, 'hh:mm:ss').format('HH:mm')).replace(':', 'h');
    } else {
      return this.translateService.instant('guest-detail-booking.set-time');
    }
  }



  getPictureOfMyHost(): string {
    let ret = '';
    if (this.property) {
      if (this.property.host && this.property.host.pictureUrl) {
        ret = this.property.host.pictureUrl;
      }
    }
    return ret;
  }
  whatsapp(use: PersonForGuest) {
    document.location.href = use.whatsAppLink;
  }
  call(use: PersonForGuest) {
    document.location.href = 'tel:' + use.phone;
  }
  callTeamInCharge(use: TeammateInCharge) {
    document.location.href = 'tel:' + use.phoneNumber;
  }

  callTeammate(use: TeammateInCharge | CoHostInCharge) {
    document.location.href = 'tel:' + use.phoneNumber;
  }

  emailPerson(use: PersonForGuest | TeammateInCharge | CoHostInCharge) {
    document.location.href = 'mailto:' + use.email;
  }
  emailPersonTeammate(use: TeammateInCharge | CoHostInCharge) {
    document.location.href = 'mailto:' + use.email;
  }

  getLanguage(languageCode: string) {
    return UtilsService.getLanguageFlag(languageCode);
  }



  isDesktopMode(): boolean {
    return this.utilService.isDesktop(this.screenWidth);
  }

  @HostListener('window:resize', ['$event'])
  getScreenWidth(event?) {
    this.screenWidth = window.innerWidth;
  }

  getImportantInfoCount(): number {
    let infosCount = 0;
    if (this.canShowIglooHome()) {
      infosCount += 1;
      this.activePartner = 'igloohome';
    }
    if (this.canShowTheKeys()) {
      infosCount += 1;
      this.activePartner = 'thekeys';
    }
    if (this.isSwiklyConfigured()) {
      if (this.activePartner == null) {
        this.activePartner = 'swikly';
      }
      infosCount += 1;
    }
    if (this.property.needPreCheck && this.booking) {
      infosCount += 1;
    }

    if (this.importantGuides && this.importantGuides.length > 0) {
      infosCount += this.importantGuides.length;
    }

    return infosCount;
  }

  deposeCaution() {
    console.log('cautio deposit');
  }

  counter(type: 'travelers' | 'beds' | 'baths' | 'doublebeds' | 'singlebeds' | 'sofabeds') {
    switch (type) {
      case 'travelers':
        const travelersCount =  this.booking.adults + this.booking.children + this.booking.babies;
        return travelersCount > 0 ? travelersCount : (this.booking.guests ? this.booking.guests.length : 0);

      case 'beds':
        return this.property.doubleBeds + this.property.singleBeds + this.property.sofaBeds + this.property.babyBeds;
      case 'doublebeds':
        return this.property.doubleBeds ;
      case 'singlebeds':
        return this.property.singleBeds;
      case 'sofabeds':
        return this.property.sofaBeds;
      case 'baths':
        return this.property.bathrooms;
    }
  }

  isSwiklyConfigured() {
      return this.booking && this.booking.swiklyInfo && this.booking.swiklyInfo.swiklyAcceptUrl;
  }
  isIgloohomeConfigured(): boolean {
    return this.property.iglooHomeDisplayWelcomeBooklet && this.booking && !!(this.booking.iglooHomeAccess ? this.booking.iglooHomeAccess.code : this.booking.iglooHomeLockCode);
  }

  isTheKeysConfigured(): boolean {
    return this.property.smartLockDisplayWelcomeBooklet && this.booking && this.booking.theKeysAccesses && this.booking.theKeysAccesses.length > 0;
  }

  needToShowGuide(guide: Guide) {
    if (guide.partnerName != null && guide.partnerName !== '' && guide.partnerType != null && guide.partnerType !== '') {
      if (guide.partnerName === 'swikly') {
        return this.isSwiklyConfigured() && !this.booking.swiklyInfo.swiklyDepositAcceptedDate;
      } else if (guide.partnerName === 'the-keys') {
        return this.isTheKeysConfigured();
      } else if (guide.partnerName === 'igloohome') {
        return this.isIgloohomeConfigured();
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  isCautionDeposed(): boolean {
    return this.isSwiklyConfigured() && !!this.booking.swiklyInfo.swiklyDepositAcceptedDate;
  }
  isCautionAllowToShow(): boolean {
    // console.log(this.booking.startDate);
    // console.log(moment(this.booking.startDate).add(-5, 'days').format('YYY/MM/DD'));
    return moment(this.booking.startDate).add(-1 * this.getNbDaysForDepositShow(), 'days').isBefore(moment.now());

  }

  getNbDaysForDepositShow() : number {
    return this.property.nbDaysToShowDepositLink != null ? this.property.nbDaysToShowDepositLink : 5;
  }

  canShowIglooHome() {
    return (this.isIgloohomeConfigured() && (!this.isSwiklyConfigured() || this.isCautionDeposed()) );
  }

  canShowTheKeys() {
    return (this.isTheKeysConfigured() && (!this.isSwiklyConfigured() || this.isCautionDeposed()))
  }

  clipBoardCopy(text: string) {
    this.clipBoardSrv.copy(text);
  }
  getFirstLetter(host: PersonForGuest | CoHostInCharge) {
    if (!host) {
      return '';
    }
    if (host.firstName) {
      return host.firstName.substr(0, 1);
    }
    if (host.lastName) {
      return host.lastName.substr(0, 1);
    }
    if (host.email) {
      return host.email.substr(0, 1);
    }
  }

  private initRecPins() {
    const iconBaseRecommendation = '/assets/icon/recommendation/';
    const parcsAndOutdoors = {
      url: iconBaseRecommendation + 'map-cluster-parcsAndOutdoors.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const shops = {
      url: iconBaseRecommendation + 'map-cluster-shops.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const sport = {
      url: iconBaseRecommendation + 'map-cluster-sport.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const beauty = {
      url: iconBaseRecommendation + 'map-cluster-beauty.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const essentials = {
      url: iconBaseRecommendation + 'map-cluster-essentials.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const health = {
      url: iconBaseRecommendation + 'map-cluster-health.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const pubAndRestaurants = {
      url: iconBaseRecommendation + 'map-cluster-pubAndRestaurants.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const spots = {
      url: iconBaseRecommendation + 'map-cluster-spots.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const activities = {
      url: iconBaseRecommendation + 'map-cluster-activities.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const cars = {
      url: iconBaseRecommendation + 'map-cluster-cars.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const transports = {
      url: iconBaseRecommendation + 'map-cluster-transports.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };

    const localProducers = {
      url: iconBaseRecommendation + 'map-cluster-localProducers.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };


    const yaago = {
      url: iconBaseRecommendation + 'icon-reco-yaago.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };


    const yaago_parcsAndOutdoors = {
      url: iconBaseRecommendation + 'yaago-5-parc.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const yaago_shops = {
      url: iconBaseRecommendation + 'yaago-8-magasin.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const yaago_sport = {
      url: iconBaseRecommendation + 'yaago-2-sport.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const yaago_beauty = {
      url: iconBaseRecommendation + 'yaago-10-beaute.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const yaago_essentials = {
      url: iconBaseRecommendation + 'yaago-7-essentiel.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const yaago_health = {
      url: iconBaseRecommendation + 'yaago-4-sante.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const yaago_pubAndRestaurants = {
      url: iconBaseRecommendation + 'yaago-11-restaurant.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const yaago_spots = {
      url: iconBaseRecommendation + 'yaago-3-monument.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const yaago_activities = {
      url: iconBaseRecommendation + 'yaago-6-activite.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const yaago_cars = {
      url: iconBaseRecommendation + 'yaago-9-voiture.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const yaago_transports = {
      url: iconBaseRecommendation + 'yaago-1-transport.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };


    const yaago_localProducers = {
      url: iconBaseRecommendation + 'yaago-13-localProducers.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };


    this.iconMarkers = {
      transports: { icon: transports },
      cars: { icon: cars },
      activities: { icon: activities },
      spots: { icon: spots },
      pubAndRestaurants: { icon: pubAndRestaurants },
      health: { icon: health },
      essentials: { icon: essentials },
      beauty: { icon: beauty },
      sport: { icon: sport },
      shops: { icon: shops },
      parcsAndOutdoors: { icon: parcsAndOutdoors },
      localProducers: { icon: localProducers },

      yaago_transports: { icon: yaago_transports },
      yaago_cars: { icon: yaago_cars },
      yaago_activities: { icon: yaago_activities },
      yaago_spots: { icon: yaago_spots },
      yaago_pubAndRestaurants: { icon: yaago_pubAndRestaurants },
      yaago_health: { icon: yaago_health },
      yaago_essentials: { icon: yaago_essentials },
      yaago_beauty: { icon: yaago_beauty },
      yaago_sport: { icon: yaago_sport },
      yaago_shops: { icon: yaago_shops },
      yaago_parcsAndOutdoors: { icon: yaago_parcsAndOutdoors },
      yaago_localProducers: { icon: yaago_localProducers },

      yaago: {icon: yaago }
    };
  }

  transform(url): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  closeGuide() {
    this.showGuideDetails = false;
  }
  showGuide(guide: Guide) {

    this.currentGuide = guide;
    this.showGuideDetails = true;
  }

  getGuideCover(guide: Guide) {
    if (!guide || !guide.documents || guide.documents.length === 0) {
      return this.getPictureFromCategory(guide.category);
    }
    const firstPhoto = guide.documents.find(item => item.type === DocType.IMAGE);
    if (!firstPhoto) {
      return this.getPictureFromCategory(guide.category);
    }

    return firstPhoto.url;
  }

  getPictureFromCategory(category: string) {
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
      case CategoryGuide.SERVICES:
        image = '../../../../assets/images/list-guides/service.png';
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
  }

  isPropertyReady() {
    if (!this.booking) {
      return false;
    }
    const checkinTime = moment(this.booking.startDate + ' ' + this.booking.expectedCheckinLocalTime, 'YYYY-MM-DD HH:mm:ss');
    return this.booking.preCheckIn || moment().isAfter(checkinTime) ;
  }

  showInventory() {
    this.router.navigate(['/guest/' + this.booking.id  + '/inventory']).then();
  }



}
