import {Poi} from '../Poi';
import {SortDto} from './SortDto';

export class RecommendationSearchRequestDto {
  categories: any[];
  tagIds: string[];
  minRanking: number;
  superRecommendation: boolean;
  onlyMine: boolean;
  maxDistance: number;

  distanceReference: Poi;
  propertyId: string;
  centerMapLocation: Poi;

  sorts: SortDto[];
  pageSize: number;
  pageNumber: number;
  withCount: boolean;

  hostAdresses: boolean;
  communityAdresses: boolean;
  yaagoAdresses: boolean;
  influencerAdresses: boolean;

  bookingStart: any;
  bookingEnd: any;
  bookingId: string;

  constructor() {
    this.categories = [];
    this.maxDistance = 20;
    this.pageNumber = 0;
    this.pageSize = 20;
    this.centerMapLocation = new Poi();
    this.distanceReference = new Poi();
  }

}
