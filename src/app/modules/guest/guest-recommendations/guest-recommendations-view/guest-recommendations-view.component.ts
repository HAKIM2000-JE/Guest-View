import {Component, HostListener, Input, NgZone, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Property} from '../../../../models/Property';
import {RecommendationSearchRequestDto} from '../../../../models/guestview/RecommendationSearchRequestDto';
import {Recommendation} from '../../../../models/guestview/Recommendation';
import {RecommendationCategory} from '../../../../models/guestview/RecommendationCategory';
import {GuestService} from '../../../../core/services/guest.service';
import {PropertyForGuest} from '../../../../models/guestview/PropertyForGuest';
import {UtilsService} from '../../../../core/services/utils.service';
import {TranslateService} from '@ngx-translate/core';
import {LanguageManagementService} from '../../../../core/services/language.service';
import {BookingForGuest} from "../../../../models/guestview/BookingForGuest";
import { CollectDataServiceService } from 'src/app/core/services/collect-data-service.service';
import * as moment from "moment";
declare var google: any;

@Component({
  selector: 'app-guest-recommendations-view',
  templateUrl: './guest-recommendations-view.component.html',
  styleUrls: ['./guest-recommendations-view.component.scss']
})
export class GuestRecommendationsViewComponent implements OnInit {

  language = navigator.language;
  recommendationSearch = new RecommendationSearchRequestDto();
  hostDoesntHaveAnyRecommendation = false;
  recommendations: Recommendation[] = [];
  newRecommendations: Recommendation[] = [];
  recommendations2: Recommendation[] = [];
  recommendationCategory = new RecommendationCategory();
  categories: any[] = new RecommendationCategory().list;
  selectedCategory = 'all';
  isLoading = false;
  property: PropertyForGuest;
  booking: BookingForGuest;
  startFilter = false;
  @ViewChild('mytemplate', null) mytmpl: any;

  constructor(
    public utilsService: UtilsService,
    public guestService: GuestService,
    public translateService: TranslateService,
    public zone: NgZone,
    public languageService: LanguageManagementService ,
    public CollectData :CollectDataServiceService
  ) {}

  ngOnInit() {
    this.recommendationSearch.onlyMine = true;
    this.recommendationSearch.categories = [];
    this.defineLanguage();
    this.getProperty();
    this.getBooking();
  }

  defineLanguage() {
    const lang: any = this.language.includes('-') ? this.language.split('-') : this.language;
    this.language = Array.isArray(lang) ? lang[0] : lang;
    this.language = this.language ? this.language : 'en';
  }

  async defineSearchQuery() {
    this.recommendationSearch.propertyId = this.property.id;
    if (this.booking && this.booking.startDate && this.booking.endDate) {
      this.recommendationSearch.bookingStart = moment(this.booking.startDate).startOf('day');
      this.recommendationSearch.bookingEnd = moment(this.booking.endDate).endOf('day');
      this.recommendationSearch.bookingId = this.booking.id;
    }

    this.recommendationSearch.categories = [];
    if (this.selectedCategory !== 'all') {
      this.recommendationSearch.categories.push(this.selectedCategory);
    }
     // !this.property.host.includeCommunityRecommendation;
    this.zone.run(() => {
      this.getNewRecommendations();
    });
  }

  getProperty() {
    this.guestService.getProperty().subscribe(
      res => {
        if (res) {
          console.log('PROPERTY', res);
          this.property = res;
          this.defineSearchQuery();
        }
      },
      err => {

      }
    );
  }

  getBooking() {
    this.guestService.getBooking().subscribe(
      res => {
        if (res) {
          console.log('BOOKIONG', res);
          this.booking = res;
        }
      },
      err => {

      }
    );
  }
  like() {

  }


  getNewRecommendations() {
    if (!this.hostDoesntHaveAnyRecommendation)  {
      this.guestService.getRecommendations(this.recommendationSearch, this.languageService.getLanguageInUrl(),
        (this.property && this.property.host) ? this.property.host.id : null).subscribe(res => {
        console.log('result', res);
        if (res == null || res.length === 0) {
          this.hostDoesntHaveAnyRecommendation = true;
          if (this.property.host.includeCommunityRecommendation) {
            this.recommendationSearch.onlyMine = false;
            this.guestService.getRecommendations(this.recommendationSearch, this.languageService.getLanguageInUrl(),
              (this.property && this.property.host)? this.property.host.id : null).subscribe(res2 => {
              console.log('result2', res2);
              this.completeRecommendations(res2);
            });
          }
        } else {
          this.completeRecommendations(res);
        }
      });
    } else {
      this.guestService.getRecommendations(this.recommendationSearch, this.languageService.getLanguageInUrl(),
        (this.property && this.property.host)? this.property.host.id : null).subscribe(res2 => {
        console.log('result2', res2);
        this.completeRecommendations(res2);
      });
    }
  }

  completeRecommendations(res: Recommendation[]) {
    console.log('newRecommendations:', res);
    let nbItems = 0;
    this.newRecommendations = [];
    res.forEach( r => {
      if (nbItems < 4) {
        console.log('MainPhoto', r.mainPhoto);
        if (r.mainPhoto == null || r.mainPhoto === '') {
          console.log('MainPhoto: Null');
          r.mainPhoto = '/assets/icon/recommendation/empty/' + r.category.key + '.jpg';
        }
        this.newRecommendations.push(r);
      }
      nbItems++;
    });
  }


  getRecommendations() {
    this.isLoading = true;
    this.guestService.getRecommendations(this.recommendationSearch, this.languageService.getLanguageInUrl(),
      (this.property && this.property.host)? this.property.host.id : null).subscribe(
      res => {
        console.log('res:', res);
        this.recommendations = res;

        console.log('recommendations', this.recommendations);

        this.recommendations.forEach( rec => {

          if (rec.googlePlaceId !== '') {
            // find in GooglePlaces and replace the GooglePhotos
            const request = {
              placeId: rec.googlePlaceId,
              fields: ['name', 'photos'],
              rec2: this.recommendations2
            };
            const service = new google.maps.places.PlacesService(document.createElement('div'));

            service.getDetails(request, results => {


              //console.log('retreive the photos: ' + rec.googlePlaceId);
              //console.log(results);
              //console.log(rec.googlePlaceId);
              if (results) {
                const photoToKeep = [];
                rec.photos.forEach(p => {
                  if (!p.startsWith('https://maps.googleapis', 0)) {
                    photoToKeep.push(p);
                  }
                });
                rec.photos = photoToKeep;
                //console.log('photoToKeep', photoToKeep);
                //console.log(results['photos']);
                if (results['photos']) {
                  results['photos'].forEach(p => {
                    //console.log(p);
                    rec.photos.push(p.getUrl());
                  });
                  console.log('photos', rec.photos);
                  if (rec.photos.length > 0) {
                    rec.mainPhoto = rec.photos[0];
                    //console.log('setup mainphoto', rec.mainPhoto);
                  }
                }

                console.log('rec2; rec', rec.mainPhoto);
                this.recommendations2.push(rec);
                /*console.log('rec2; rec', rec);
                console.log('rec2', request.rec2);*/
              }



            });
            // console.log('REC', rec);
            this.isLoading = false;
            }
          });

        let nbItems = 0;
        this.newRecommendations = [];
        this.recommendations.forEach( r => {
          if (nbItems < 4) {
            console.log('MainPhoto', r.mainPhoto);
            if (r.mainPhoto == null || r.mainPhoto === '') {
              console.log('MainPhoto: Null');
              r.mainPhoto = '/assets/icon/recommendation/empty/' + r.category.key + '.jpg';
            }
            this.newRecommendations.push(r);
          }
          nbItems++;
        });



      },
      err => {
        console.log('error', err);
        this.isLoading = false;
      }
    );
  }

  searchByCategory(type) {
    console.log(type);
    this.recommendationSearch.categories =  [];
    this.recommendationSearch.categories.push(type);
    this.getRecommendations();
    this.openCategory();
  }

  showMap() {
    this.guestService.showMap(true, this.property);
  }

  getEmptyPicture(recommendation: Recommendation): string {
    return "this.src='assets/icon/recommendation/empty/'" + recommendation.category.key;
  }

  showRec() {
    console.log(this.recommendations2);
  }

  openCard(recommendation) {
    this.showMap();
    this.guestService.openCard(recommendation, this.property);
  }

  openCategory() {
    this.startFilter = !this.startFilter;
  }

  @HostListener('window:resize', ['$event'])
  isDesktopMode(event?) {
    return this.utilsService.isDesktop(window.innerWidth);
  }

  categorySelectionChange($event) {
    this.selectedCategory = $event;
    this.defineSearchQuery();
  }




  
  onClickOnCategorieAtPage(profil : any , categorie:any){
    this.CollectData.setOnClickCategorie(this.booking.id,categorie.key);
  }

  onClickOnRecomendationItemAtPage(profile : any , recomendation : any ){
    this.CollectData.setOnClickItemInRecomendation(this.booking.id,recomendation.id)
    
    //console.log("this is my proprety: ", this.property)
    //console.log("this is my booking : ",  this.booking)
  }  


}
