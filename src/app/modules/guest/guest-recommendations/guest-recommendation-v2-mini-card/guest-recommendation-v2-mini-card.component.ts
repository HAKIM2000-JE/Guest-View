import { Component, OnInit } from '@angular/core';
import {AbstractWindow} from '../../../../core/abstract/AbstractWindow';
import {TranslateService} from '@ngx-translate/core';
import {Person} from '../../../../models/Person';
import {IntercomService} from '../../../../core/services/IntercomService';
import {UtilsService} from '../../../../core/services/utils.service';
import {Recommendation} from '../../../../models/guestview/Recommendation';
import {slideInOut} from '../../../../shared/animations/slideOutAnimation';
import {GuestService} from '../../../../core/services/guest.service';
import {Property} from '../../../../models/Property';

@Component({
  selector: 'app-guest-recommendation-v2-mini-card',
  templateUrl: './guest-recommendation-v2-mini-card.component.html',
  styleUrls: ['./guest-recommendation-v2-mini-card.component.scss'],
  animations: [slideInOut]
})
export class GuestRecommendationV2MiniCardComponent extends AbstractWindow implements OnInit {

  recommendation: Recommendation;
  mapReco: any;
  language = navigator.language;
  readMore: boolean;
  tags: any[] = [];
  currentLat: any;
  currentLng: any;
  property: Property;
  _hasNext: boolean;
  _hasPrevious: boolean;
  _isFromCommunity: boolean;
  _isFromMyHost: boolean;

  constructor(private guestService: GuestService,
              public intercomService: IntercomService,
              public translateService: TranslateService,
              public utilsService: UtilsService) {
    super(intercomService, utilsService);
  }

  ngOnInit() {
    this.initCardDetails();
  }


  initCardDetails() {
    this.guestService.getMiniCard().subscribe(
      res => {
        if ( res && res.recommendation ) {
          this.recommendation = res.recommendation;
          this.property = res.property;
          console.log(this.recommendation);
        } else {
          this.recommendation = null;
        }
        this.isFromMyHost();
        this.isFromCommunity();
      },
      err => {

      }
    );
  }

  seeMore() {
    this.guestService.openCard(this.recommendation, this.property);
    this.guestService.closeMiniCard();
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

}
