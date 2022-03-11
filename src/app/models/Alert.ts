export class Alert {

  type: AlertType;
  category: AlertCategory;
}

export enum AlertType {
  NOTIFICATION= 'NOTIFICATION',
  ALERT = 'ALERT'
}

export enum AlertCategory {
  SWIKLY_REQUIRED= 'SWIKLY_REQUIRED',
  DEPARTURE_INFO = 'DEPARTURE_INFO',
  STAY_EVALUATION = 'STAY_EVALUATION'
}
