import {Component, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Recommendation} from '../../../../models/guestview/Recommendation';
import {UtilsService} from '../../../../core/services/utils.service';
import {GuestService} from '../../../../core/services/guest.service';
import {Property} from '../../../../models/Property';
import {Comment} from '../../../../models/guestview/Comment';
import {ButtonType} from '../../../../shared/components/button/button.component';
import {Icons} from "../../../../models/icons";
import {LanguageManagementService} from "../../../../core/services/language.service";
import {finalize, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import { CollectDataServiceService } from 'src/app/core/services/collect-data-service.service';
import { BookingForGuest } from 'src/app/models/guestview/BookingForGuest';
declare var google: any;

@Component({
  selector: 'app-guest-recommendations-card',
  templateUrl: './guest-recommendations-card.component.html',
  styleUrls: ['./guest-recommendations-card.component.scss']
})
export class GuestRecommendationsCardComponent implements OnInit, OnDestroy {
  @Input() bookingId: string;
  _myDestroy = new Subject();
  language = navigator.language;
  recommendation: Recommendation;
  booking: BookingForGuest;
  readMore: boolean;
  tags: any[] = [];
  currentLat: any;
  currentLng: any;
  property: Property;
  _hasNext: boolean;
  _hasPrevious: boolean;
  _isFromCommunity: boolean;
  _isFromMyHost: boolean;
  index = 0;

  ButtonType = ButtonType;
  Icons = Icons;
  isLoadingReviews = false;


  constructor(
    public utils: UtilsService,
    public guestService: GuestService,
    public langSrv: LanguageManagementService ,
    public CollectData :CollectDataServiceService
  ) {}

  ngOnDestroy() {
    this._myDestroy.next();
    this._myDestroy.complete();
  }

  ngOnInit() {
    this.defineLanguage();
    this.initCardDetails();
    // this.defineLocation();
    this.getBooking();

  }

  hasNext(): boolean {
    let ret = false;
    if (this.recommendation && this.recommendation.photos
      && this.recommendation.photos.length > 0 && this.recommendation.mainPhoto) {
      const index = this.getPhotoIndex(this.recommendation.photos, this.recommendation.mainPhoto);
      ret = index !== this.recommendation.photos.length - 1;
    }
    return ret;
  }
  hasPrevious(): boolean {
    let ret = false;
    if (this.recommendation && this.recommendation.photos
      && this.recommendation.photos.length > 0 && this.recommendation.mainPhoto) {
      const index = this.getPhotoIndex(this.recommendation.photos, this.recommendation.mainPhoto);
      ret = index > 0;
    }
    return ret;
  }

  next() {
    if (this._hasNext) {
      this.index++;
      this.recommendation.mainPhoto = this.recommendation.photos[this.index].replace('?aki_policy=medium', '?aki_policy=large');
      this._hasNext = this.hasNext();
      this._hasPrevious = this.hasPrevious();
    }
  }

  previous() {
    if (this._hasPrevious) {
      this.index--;
      this.recommendation.mainPhoto = this.recommendation.photos[this.index].replace('?aki_policy=medium', '?aki_policy=large');
      this._hasNext = this.hasNext();
      this._hasPrevious = this.hasPrevious();
    }
  }
  private getPhotoIndex(photos: string[], photoUrl: string) {
    if (photos && photoUrl) {
      const fPhoto = photoUrl.replace('?aki_policy=large', '?aki_policy=medium');
      return photos.findIndex(p => p.startsWith(fPhoto));
    } else {
      return -1;
    }
  }
  defineLanguage() {
    if (this.langSrv.getLanguageInUrl()) {
      this.language = this.langSrv.getLanguageInUrl();
      return;
    }
    const lang: any = this.language.includes('-') ? this.language.split('-') : this.language;
    this.language = Array.isArray(lang) ? lang[0] : lang;
    this.language = this.language ? this.language : 'en';
  }

  // defineLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(position => {
  //       this.currentLat = position.coords.latitude;
  //       this.currentLng = position.coords.longitude;
  //     }, err => {
  //       this.currentLat = 48.856614;
  //       this.currentLng = 2.352221;
  //     });
  //   } else {
  //     this.currentLat = 48.856614;
  //     this.currentLng = 2.352221;
  //   }
  // }

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



  initCardDetails() {
    this.guestService.getStatusOfCard().subscribe(
      res => {
        if ( res.recommendation ) {
          this.recommendation = res.recommendation;
          this.property = res.property;
          console.log(this.recommendation);

          this.parseTags();
          if (this.recommendation && this.recommendation.reviews && this.recommendation.reviews.length > 0) {
            this.getTranslatedReviews();
          }
        } else {
          this.recommendation = res.recommendation;
        }
        this._hasNext = this.hasNext();
        this._hasPrevious = this.hasPrevious();
        this.index = this.recommendation && this.recommendation.photos ?
          this.getPhotoIndex(this.recommendation.photos, this.recommendation.mainPhoto) : 0;
        console.log(this.recommendation);
        this.isFromMyHost();
        this.isFromCommunity();
      },
      err => {

      }
    );
  }

  getTranslatedReviews() {
    this.isLoadingReviews = true;
    this.guestService.getReviewsTranslated(this.recommendation.id, this.language).pipe(takeUntil(this._myDestroy))
      .subscribe(
        data => {
          console.log('DATA', data);
          this.recommendation.reviews = data;
          const mainPersonId = this.recommendation.comment ? this.recommendation.comment.personId : null;
          console.log('PERSON-ID', mainPersonId);
          const comment = data.find(item => item.personId === mainPersonId);
          // this.recommendation.setMainComment(this.recommendation.reviews, mainPersonId);
          this.recommendation.comment.comment = comment ? comment.comment : 'makanch';
          this.isLoadingReviews = false;
        }, error => { this.isLoadingReviews = false; }
      );
  }
  parseTags() {
    this.tags = [];
    this.guestService.getTags().subscribe(
      res => {
          this.recommendation.tagIds.forEach( tagId => {
            res.forEach( (tagRes: any) => {
              if (tagRes.id === tagId) {
                tagRes.tags.forEach( el => {
                  if (el.language === this.language ) {
                    this.tags.push(el);
                  }
                });
              }
            });
          });
      },
      err => {
      }
    );
  }

  showMoreLessComment() {
    this.readMore = !this.readMore;
    if (this.readMore) {
      this.recommendation.comment.comment = this.recommendation.comment.commentLong;
    } else {
      this.recommendation.comment.comment = this.recommendation.comment.commentShort;
    }
    if (!this.readMore) {
      document.getElementById('avisSection')
        .scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    }
  }

  updateMainImage(photo) {
    this.recommendation.mainPhoto = photo;
  }

  showReviews(reviews) {
    this.guestService.openReviews(reviews, this.recommendation.title);
  }

  close() {
    this.guestService.closeCard();
  }

  @HostListener('window:resize', ['$event'])
  isDesktopMode(event?) {
    return this.utils.isDesktop(window.innerWidth);
  }

  private isFromMyHost() {
    console.log('isMYHOST', this.recommendation , this.property);
    if (this.recommendation && this.recommendation.yaagoReco) {
      this._isFromCommunity = false;
      return;
    }
    if (!this.recommendation || !this.recommendation.comment || !this.recommendation.comment.personId) {
      this._isFromMyHost = false;
      return ;
    }
    if (!this.property || !this.property.hosts) {
      this._isFromMyHost = false;
      return ;
    }
    if (this.property.hosts.find(item => item.id === this.recommendation.comment.personId)) {
      this._isFromMyHost = true;
    }
  }

  private isFromCommunity() {

    if (this.recommendation && this.recommendation.influencerDetails != null) {
      this.recommendation.comment.type = 'influencer';
      if (this.recommendation.comment.pictureUrl == null || this.recommendation.comment.pictureUrl === '') {
        this.recommendation.comment.pictureUrl = 'assets/images/instagram_logo.png';
      }
    }

    if (this.recommendation && this.recommendation.yaagoReco) {
      this._isFromCommunity = false;
      return;
    }
    if (!this.recommendation || !this.recommendation.comment || !this.recommendation.comment.personId) {
      this._isFromCommunity = false;
      return ;
    }
    if (!this.property || !this.property.hosts) {
      this._isFromCommunity = false;
      return ;
    }
    if (!this.property.hosts.find(item => item.id === this.recommendation.comment.personId)) {
      this._isFromCommunity = true;
    }
  }

  getFirstLetter(comment: Comment) {
    if (!comment) {
      return '';
    }
    if (comment.name) {
      return comment.name.substr(0, 1).toUpperCase();
    }
    return '';
  }
  getTrimedText(text: string, max: number) {
    if (text.length < max) {
      return text;
    }
    return this.readMore ? text : text.substr(0, max) + '...';
  }

  openWebsite(url) {
    window.open(url, '_blank');
  }
  openDirection(property: Property, recommendation: Recommendation) {
    const url = 'https://www.google.com/maps/dir/' +
      property.poi.y + ',' + property.poi.x + '/' + recommendation.poi.y + ',' + recommendation.poi.x;
    window.open(url, '_blank');
  }






  unlike(recommendation: Recommendation) {
    this.guestService.unlikeRecommendation(this.bookingId, recommendation.id).subscribe( b => {
      this.recommendation.nbLikes--;
      this.recommendation.bookingWhichLikes = [];
    });
  }

  like(recommendation: Recommendation) {
    this.guestService.likeRecommendation(this.bookingId, recommendation.id).subscribe( b => {
      if (this.recommendation.nbLikes == null) {
        this.recommendation.nbLikes = 0;
      }
      this.recommendation.nbLikes++;
      this.recommendation.bookingWhichLikes = [];
      this.recommendation.bookingWhichLikes.push(this.bookingId);
    });
  }



  

  onClickVisteWebSite(Reconmmendation : any , Profil :any){
    this.CollectData.setOnClickVisteWebSiteOfBusiness(this.booking.id,Reconmmendation.id);
  }

  onClickSyRendre(Reconmmendation : any , Profil :any){
    this.CollectData.setOnClickSyRendreOfBusiness( this.booking.id ,Reconmmendation.id); 
  }

  onClickNextOnPhotoRecommendation(Reconmmendation: any , Profil :any){
    this.CollectData.setOnClickNextInPhotoOfBusiness(this.booking.id,Reconmmendation.id);
  }



}
