import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Property} from '../../../models/Property';
import {RecommendationSearchRequestDto} from '../../../models/guestview/RecommendationSearchRequestDto';
import {GuestService} from '../../../core/services/guest.service';
import {Recommendation} from '../../../models/guestview/Recommendation';
import {Poi} from '../../../models/Poi';
import {RecommendationCategory} from '../../../models/guestview/RecommendationCategory';
import {LanguageManagementService} from "../../../core/services/language.service";

@Component({
  selector: 'app-guest-recommendations',
  templateUrl: './guest-recommendations.component.html',
  styleUrls: ['./guest-recommendations.component.scss']
})
export class GuestRecommendationsComponent implements OnInit, OnChanges {
  @Input('property') property: Property;

  recommendationSearch = new RecommendationSearchRequestDto();
  recommendations: Recommendation[] = [];
  recommendationCategory = new RecommendationCategory();

  constructor(
    public guestService: GuestService,
    public languageService: LanguageManagementService
  ) {}

  ngOnInit() {
    this.recommendationSearch.categories = [];
  }

  async defineSearchQuery() {
    this.recommendationSearch.propertyId = this.property.id;
    await navigator.geolocation.getCurrentPosition(position => {
      this.recommendationSearch.distanceReference.y = position.coords.latitude;
      this.recommendationSearch.distanceReference.x = position.coords.longitude;
      this.getRecommendations();
      }, err => {
      this.getRecommendations();
    }, {timeout: 5000});
  }

  getRecommendations() {
    this.guestService.getRecommendations(this.recommendationSearch,this.languageService.getLanguageInUrl()).subscribe(
      res => {
        this.recommendations = res;
      },
      err => {
          console.log(err);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.property && this.property.id) {
      this.defineSearchQuery();
    }
  }

  searchByCategory(type) {
    this.recommendationSearch.categories.length = 0;
    this.recommendationSearch.categories.push(type);
    this.getRecommendations();
  }

  onClickOnCategorieAtPage(){
    alert('CLLLLICK CATEGORIE')
  }

}
