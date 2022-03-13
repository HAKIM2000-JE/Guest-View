import {Component, HostListener, NgZone, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UtilsService} from '../../../../core/services/utils.service';
import {Recommendation} from '../../../../models/guestview/Recommendation';
import {Poi} from '../../../../models/Poi';
import {RecommendationSearchRequestDto} from '../../../../models/guestview/RecommendationSearchRequestDto';
import {GuestService} from '../../../../core/services/guest.service';
import {TranslateService} from '@ngx-translate/core';
import {LanguageManagementService} from '../../../../core/services/language.service';
import {GoogleAnalyticsService} from "ngx-google-analytics";
import {Tags} from "../../../../models/guestview/Tags";
import {RecommendationCategory} from "../../../../models/guestview/RecommendationCategory";
import {BookingForGuest} from "../../../../models/guestview/BookingForGuest";
import * as moment from 'moment';
import { CollectDataServiceService } from 'src/app/core/services/collect-data-service.service';

declare var google: any;
declare var MarkerClusterer: any;

@Component({
  selector: 'app-guest-recommendations-map',
  templateUrl: './guest-recommendations-map.component.html',
  styleUrls: ['./guest-recommendations-map.component.scss']
})
export class GuestRecommendationsMapComponent implements OnInit {

  isMine = true;
  isCommunity = false;
  isInfluencer = false;

  isYaago = false;
  recommendationSearch: RecommendationSearchRequestDto = new RecommendationSearchRequestDto();
  showMap = false;
  fromSearch = false;
  searchedAddress: string;
  searchedPlaceId: string;

  @ViewChild('guruMap', null) guruMapElement: any;
  public guruMap: any;
  public property;
  public booking: BookingForGuest;
  public propertyId: string = null;
  public lat: number;
  public lng: number;
  public currentLat: number;
  public currentLng: number;
  public iconMarkers: any;
  public markers = [];
  public preparedmarkers = [];
  public mapProperty: any;
  public currentPopup = null;
  public markerClusters;
  public recommendationList: Recommendation[];

  showFilters = false;
  categoryTags: Tags[] = [];
  allTags: Tags[] = [];
  categories: any[] = new RecommendationCategory().list;
  selectedCategory: any;
  filterTagsIds = [];

  constructor(
    public utilsService: UtilsService,
    public zone: NgZone,
    public renderer: Renderer2,
    public router: Router,
    public guestService: GuestService,
    public translateService: TranslateService,
    public languageService: LanguageManagementService,
    public gaSrv: GoogleAnalyticsService ,
    public CollectData :CollectDataServiceService
  ) { }

  ngOnInit() {
    // workaround to delete all on categories list
    this.categories.splice(this.categories.length - 1, 1);
    this.guestService.isMap$.subscribe(
      res => {
        this.showMap = res.value;
        this.property = res.property;
        if (this.property && this.property.host && this.property.host.includeCommunityRecommendation) {
          this.isCommunity = true;
          this.isYaago = true;
        }
      },
      err => {}
    );
    this.guestService.getBooking().subscribe(
      data => {
        console.log('BOOOOKING', data);
        this.booking = data;
      }
    );
    this.gaSrv.pageView('/guest/{id}/recommendationsMap', 'Recommendation-Map');
  }

  initialize() {
    this.lat = this.property.poi.y;
    this.lng = this.property.poi.x;
    this.loadInputSearch();
    this.loadMap();
    this.reloadRecommendations();

    const iconBaseRecommendation = './assets/icon/recommendation/';
    const iconBaseRecommendationInstagram = './assets/icon/recommendation/instagram/';

    const property = {
      url: iconBaseRecommendation + 'marker-property.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };

    const location = {
      url: iconBaseRecommendation + 'marker-current-location.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };

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
    const sports = {
      url: iconBaseRecommendation + 'map-cluster-sports.svg',
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
    const events = {
      url: iconBaseRecommendation + 'map-cluster-events.svg',
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
    const yaago_sports = {
      url: iconBaseRecommendation + 'yaago-2-sports.svg',
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

    const yaago_events = {
      url: iconBaseRecommendation + 'yaago-12-events.svg',
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



    const insta_parcsAndOutdoors = {
      url: iconBaseRecommendationInstagram + 'yaago-5-parc.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const insta_shops = {
      url: iconBaseRecommendationInstagram + 'yaago-8-magasin.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const insta_sports = {
      url: iconBaseRecommendationInstagram + 'yaago-2-sports.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const insta_beauty = {
      url: iconBaseRecommendationInstagram + 'yaago-10-beaute.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const insta_essentials = {
      url: iconBaseRecommendationInstagram + 'yaago-7-essentiel.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const insta_health = {
      url: iconBaseRecommendationInstagram + 'yaago-4-sante.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const insta_pubAndRestaurants = {
      url: iconBaseRecommendationInstagram + 'yaago-11-restaurant.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const insta_spots = {
      url: iconBaseRecommendationInstagram + 'yaago-3-monument.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const insta_activities = {
      url: iconBaseRecommendationInstagram + 'yaago-6-activite.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const insta_cars = {
      url: iconBaseRecommendationInstagram + 'yaago-9-voiture.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const insta_transports = {
      url: iconBaseRecommendationInstagram + 'yaago-1-transport.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const insta_events = {
      url: iconBaseRecommendationInstagram + 'yaago-12-events.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };
    const insta_localProducers = {
      url: iconBaseRecommendationInstagram + 'yaago-13-localProducers.svg',
      size: new google.maps.Size(39, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(39, 45)
    };

    this.iconMarkers = {
      location: { icon: location },
      property: { icon: property },
      transports: { icon: transports },
      cars: { icon: cars },
      activities: { icon: activities },
      spots: { icon: spots },
      pubAndRestaurants: { icon: pubAndRestaurants },
      health: { icon: health },
      essentials: { icon: essentials },
      beauty: { icon: beauty },
      sports: { icon: sports },
      shops: { icon: shops },
      parcsAndOutdoors: { icon: parcsAndOutdoors },
      events: { icon: events },
      localProducers: { icon: localProducers },

      yaago_transports: { icon: yaago_transports },
      yaago_cars: { icon: yaago_cars },
      yaago_activities: { icon: yaago_activities },
      yaago_spots: { icon: yaago_spots },
      yaago_pubAndRestaurants: { icon: yaago_pubAndRestaurants },
      yaago_health: { icon: yaago_health },
      yaago_essentials: { icon: yaago_essentials },
      yaago_beauty: { icon: yaago_beauty },
      yaago_sports: { icon: yaago_sports },
      yaago_shops: { icon: yaago_shops },
      yaago_parcsAndOutdoors: { icon: yaago_parcsAndOutdoors },
      yaago_events: { icon: yaago_events },
      yaago_localProducers: { icon: yaago_localProducers },

      insta_transports: { icon: insta_transports },
      insta_cars: { icon: insta_cars },
      insta_activities: { icon: insta_activities },
      insta_spots: { icon: insta_spots },
      insta_pubAndRestaurants: { icon: insta_pubAndRestaurants },
      insta_health: { icon: insta_health },
      insta_essentials: { icon: insta_essentials },
      insta_beauty: { icon: insta_beauty },
      insta_sports: { icon: insta_sports },
      insta_shops: { icon: insta_shops },
      insta_parcsAndOutdoors: { icon: insta_parcsAndOutdoors },
      insta_events: { icon: insta_events },
      insta_localProducers: { icon: insta_localProducers },

      yaago: {icon: yaago }
    };
  }

  // ngOnDestroy(): void {
  //   this.onDestroy.next();
  //   this.onDestroy.complete();
  //   this.recommendationService.endCreate();
  // }

  isMineToggle() {
    this.isMine = !this.isMine;
    this.reloadRecommendations();
  }


  loadInputSearch() {
    /*const zone = this.calculateZone(new google.maps.LatLng(this.property.poi.y, this.property.poi.x), 5000);*/
    const defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(this.lat, this.lng));
    const options = {
      bounds: defaultBounds,
      fields: [
        'formatted_address', 'geometry', 'place_id'
      ]
    };
    const addressInputElem = document.getElementById('fullAddress');
    const autocompleteFrom = new google.maps.places.Autocomplete(addressInputElem, options);
    autocompleteFrom.addListener('place_changed', () => {
      this.zone.run(() => {
        console.log(autocompleteFrom.getPlace());
        if (autocompleteFrom.getPlace().geometry.location) {
          this.lng = autocompleteFrom.getPlace().geometry.location.lng();
          this.lat = autocompleteFrom.getPlace().geometry.location.lat();
        }
        console.log('AUTOCOMPLEEEETE', autocompleteFrom.getPlace());
        this.fromSearch = true;
        this.searchedAddress = autocompleteFrom.getPlace().formatted_address;
        this.searchedPlaceId = autocompleteFrom.getPlace().place_id;
        this.loadMap();
        this.reloadRecommendations();
      });
    });
  }

  reloadRecommendations() {
    this.recommendationSearch.maxDistance = 20;
    this.recommendationSearch.pageNumber = 0;
    this.recommendationSearch.pageSize = 50;
    this.recommendationSearch.centerMapLocation = new Poi();
    this.recommendationSearch.centerMapLocation.x = this.lng;
    this.recommendationSearch.centerMapLocation.y = this.lat;
    this.recommendationSearch.distanceReference = new Poi();
    this.recommendationSearch.distanceReference.x = this.property.poi.x;
    this.recommendationSearch.distanceReference.y = this.property.poi.y;
    // this.recommendationSearch.onlyMine = this.isMine;
    // this.recommendationSearch.onlyMine =  !this.property.host.includeCommunityRecommendation ? true : this.isMine;
    this.recommendationSearch.propertyId = this.property.id;
    this.recommendationSearch.hostAdresses = this.isMine;
    this.recommendationSearch.communityAdresses = this.isCommunity;
    this.recommendationSearch.influencerAdresses = this.isInfluencer;
    this.recommendationSearch.yaagoAdresses = this.isYaago;
    this.recommendationSearch.tagIds = this.filterTagsIds;
    this.recommendationSearch.categories = [];
    if (this.selectedCategory && this.selectedCategory !== 'all-categories') {
      this.recommendationSearch.categories.push(this.selectedCategory);
    }

    if (this.booking && this.booking.startDate && this.booking.endDate) {
      this.recommendationSearch.bookingStart = moment(this.booking.startDate).startOf('day');
      this.recommendationSearch.bookingEnd = moment(this.booking.endDate).endOf('day');
      this.recommendationSearch.bookingId = this.booking.id;
    }

    this.guestService.getRecommendations(this.recommendationSearch, this.languageService.getLanguageInUrl(), this.property.host ? this.property.host.id : null).subscribe(
      res => {
        console.log('recommendations:', res);
        this.recommendationList = res;
        this.refreshMarkers();
        if (this.recommendationList && this.fromSearch) {
          console.log('REECO', this.fromSearch);
          console.log('placeid', this.searchedPlaceId);
          console.log('address', this.searchedAddress);
          this.fromSearch = false;
          const reco = this.recommendationList.find(item => item.googlePlaceId === this.searchedPlaceId || item.fullAddress === this.searchedAddress);
          if (reco) {
            this.guestService.openMiniCard(reco, this.property);
          }
        }
      },
      err => {}
    );
  }

  refreshMarkers() {

    if (this.markerClusters) {
      this.markerClusters.clearMarkers();
    }

    this.preparedmarkers = this.createMarkers(this.recommendationList);
    console.log(this.preparedmarkers);

    if (this.currentLat) {
      // Create the Market for the current Position
      this.preparedmarkers.push({
        x: this.currentLng,
        y: this.currentLat,
        position: new google.maps.LatLng(this.currentLat, this.currentLng),
        myType: 'location',
        title: 'currentLocation',
        distance: 0
      });
    }

    if (this.property) {
      this.preparedmarkers.push({
        x: this.property.poi.x,
        y: this.property.poi.y,
        position: new google.maps.LatLng(this.property.poi.y, this.property.poi.x),
        myType: 'property',
        address: this.property.fullAddress,
        title: this.property.title,
        distance: 0
      });
    }

    this.markers = [];

    for (let i = 0; i < this.preparedmarkers.length; i++) {
      this.markers.push(this.createMarker(this.preparedmarkers[i]));
    }

    if (this.guruMap) {
      this.markerClusters = new MarkerClusterer(this.guruMap, this.markers, {
        maxZoom: 14, // maxZoom set when clustering will stop
        styles: this.guestService.getClusterStyle()
        // imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        // './assets/images/mapicons/M'
      });
    }

  }

  createMarker(feature: any): any {
    const sContent = '';
    const marker = new google.maps.Marker({
      position: feature.position,
      icon: this.iconMarkers[feature.myType] == null ? this.iconMarkers.recommendation  : this.iconMarkers[feature.myType].icon,
      map: this.guruMap,
      recommendation: feature.recommendation
      // animation: google.maps.Animation.DROP
    });
    marker.setVisible(true);
    const infoWindow = new google.maps.InfoWindow({content: sContent, position: feature.position});

    google.maps.event.addListener(marker, 'click', () => {
      if (!marker.open) {
        this.onClickMarkerInMAP('Profile0' ,feature.recommendation );
        if (this.isDesktopMode()) {
          this.guestService.openCard(marker.recommendation, this.property);
        } else {
          this.guestService.openMiniCard(marker.recommendation, this.property);
        }

      } else {
        this.guestService.closeCard();
      }
    });
    google.maps.event.addListener(infoWindow, 'close', () => {
      this.currentPopup = null;
    });
    return marker;
  }

  loadMap() {
    if (!this.guruMapElement) {
      this.guruMapElement = document.getElementById('guruMap');
      if (!this.guruMapElement) { return; }
    }
    if (this.renderer) {
    }
    const element = this.guruMapElement.nativeElement;
    if (element === undefined) { return; }
    if (this.renderer) {
      try {
        const mapHeight = (this.renderer.parentNode(element) as
          HTMLElement).offsetHeight;
        this.renderer.setStyle(element, 'height', mapHeight + 'px');
      } catch (err) {

      }
    }

    this.mapProperty = {
      center: new google.maps.LatLng(this.lat, this.lng),
      zoom: 15,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: this.isDesktopMode(),
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
    this.guruMap = new google.maps.Map(element, this.mapProperty);
    this.guruMap.addListener('dragend', (event) => {
      this.lat = this.guruMap.center.lat();
      this.lng = this.guruMap.center.lng();
      this.reloadRecommendations();
      
    });
    this.guruMap.addListener('zoom_changed', (event) => {
      this.lat = this.guruMap.center.lat();
      this.lng = this.guruMap.center.lng();
      this.reloadRecommendations();
    });
    this.guruMap.addListener('click', () => {
      this.guestService.closeCard();
      this.guestService.closeMiniCard();
     
    });
  }

  createMarkers(rs: Recommendation[]): any[] {
    console.log(rs);
    const markers = [];
    rs.forEach( r => {
      markers.push({
        x: r.poi.x,
        y: r.poi.y,
        position: new google.maps.LatLng(r.poi.y, r.poi.x),
        address: r.fullAddress,
        myType: (r.influencerDetails != null) ? 'insta_' + r.category.key : (r.yaagoReco) ? 'yaago_' + r.category.key :  r.category.key,
        title: r.title,
        distance: r.distance,
        recommendation: r
      });
    });
    return markers;
  }

  closeMap() {
    this.guestService.closeMap();
  }

  @HostListener('window:resize', ['$event'])
  isDesktopMode(event?) {
    return this.utilsService.isDesktop(window.innerWidth);
  }


  showHideFilters() {
    this.showFilters = !this.showFilters;
  }
  categoryChanged(event: any, initTags = true) {
    console.log(event);
    this.selectedCategory = event;
    this.categoryTags = this.allTags.filter(item => item.category === this.selectedCategory);
    if (initTags) {
      this.filterTagsIds = [];
    }
    this.reloadRecommendations();
  }
  getTags() {
    console.log('TAGS-load');
    this.guestService.getTags().subscribe(
      res => {
        console.log('TAGS-load', res);
        this.allTags = res;
        console.log('TAGS-load alltags', this.allTags);
      }
    );
  }
  getTagName(tagId: string) {
    if (!this.allTags) {
      return;
    }
    const tag = this.allTags.find(item => item.id === tagId);
    if (tag && tag.tags) {
      let translated = tag.tags.find(tr => tr.language === this.languageService.getLanguageInUrl());
      translated = translated ? translated : tag.tags.find(tr => tr.language === 'fr');
      return translated.name;
    } else {
      return;
    }

  }
  chooseTag(tagId: string) {
    if (!this.filterTagsIds) {
      this.filterTagsIds = [];
    }
    const existingIndex = this.filterTagsIds.findIndex(item => item === tagId);
    if (existingIndex > -1) {
      this.filterTagsIds.splice(existingIndex, 1);
    } else {
      this.filterTagsIds.push(tagId);
    }
    this.reloadRecommendations();
  }
  isTagSelected(tagId: string) {
    return this.filterTagsIds.findIndex(item => item === tagId) > -1;
  }












  onClickMarkerInMAP(profile:any , recommendation:any){
    this.CollectData.setOnClickMarkerOfBusiness(this.booking.id ,recommendation.id);
  }



  onClickFilteratCategorie( profile :any , categorie :any){
    console.log('ERRRR' ,categorie)
    this.CollectData.setOnClickCategorie(this.booking.id ,categorie.key)
  }

  onClickFilteratCategorieatTAG(profile :any , tag : any){
    this.CollectData.setOnClickTag(this.booking.id ,tag.id)
  }



}
