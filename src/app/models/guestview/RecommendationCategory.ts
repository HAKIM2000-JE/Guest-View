export class RecommendationCategory {
  public static readonly CATEGORY_PUB_AND_RESTAURANTS = 'pubAndRestaurants';
  public static readonly CATEGORY_SPOTS = 'spots';
  public static readonly CATEGORY_ACTIVITIES = 'activities';
  public static readonly CATEGORY_CARS = 'cars';
  public static readonly CATEGORY_TRANSPORTS = 'transports';
  public static readonly CATEGORY_HEALTH = 'health';
  public static readonly CATEGORY_ESSENTIALS = 'essentials';
  public static readonly CATEGORY_BEAUTY = 'beauty';
  public static readonly CATEGORY_SPORTS = 'sports';
  public static readonly CATEGORY_SHOPS = 'shops';
  public static readonly CATEGORY_PARCS_AND_OUTDOORS = 'parcsAndOutdoors';
  public static readonly CATEGORY_EVENTS = 'events';
  public static readonly CATEGORY_LOCAL_PRODUCERS = 'localProducers';
  public static readonly CATEGORY_ALL = 'all';
  list: any[] = [];
  constructor() {
    this.parseToList();
  }
  parseToList() {
    for (const category in RecommendationCategory) {
      this.add(category);
    }
  }

  add(category) {
    this.list.push({
      key: RecommendationCategory[category],
      icon: 'assets/icon/recommendation/icon-category-' + RecommendationCategory[category] + '.svg',
      mapIcon: 'assets/icon/recommendation/map-cluster-' + RecommendationCategory[category] + '.svg'
    });
  }

}
