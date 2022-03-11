import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-amenities-counter',
  templateUrl: './amenities-counter.component.html',
  styleUrls: ['./amenities-counter.component.scss']
})
export class AmenitiesCounterComponent implements OnInit {

  @Input() count: number;
  @Input() type: 'beds' | 'rooms' | 'baths' | 'travelers' | 'sofabeds' | 'doublebeds'| 'singlebeds';
  constructor() { }

  ngOnInit() {
  }

  getIcon() {
    switch (this.type) {
      case 'beds':
        return '/assets/images/booking/beds.svg';
      case 'sofabeds':
        return '/assets/images/booking/sofaBeds.svg';
      case 'doublebeds':
        return '/assets/images/booking/beds.svg';
      case 'singlebeds':
        return '/assets/images/booking/singlebeds.svg';
      case 'rooms':
        return '/assets/images/booking/beds.svg';
      case 'baths':
        return '/assets/images/booking/bathrooms.svg';
      case 'travelers':
        return '/assets/images/booking/People-keys.svg';
    }
  }

  getLabel() {
    switch (this.type) {
      case 'beds':
        return this.count > 1 ? 'guest-detail-booking.beds' : 'guest-detail-booking.bed';
      case 'sofabeds':
        return this.count > 1 ? 'guest-detail-booking.sofabeds' : 'guest-detail-booking.sofabed';
      case 'doublebeds':
        return this.count > 1 ? 'guest-detail-booking.doublebeds' : 'guest-detail-booking.doublebed';
      case 'singlebeds':
        return this.count > 1 ? 'guest-detail-booking.singlebeds' : 'guest-detail-booking.singlebed';
      case 'rooms':
        return '';
      case 'baths':
        return this.count > 1 ? 'guest-detail-booking.bathRooms' : 'guest-detail-booking.bathRoom';
      case 'travelers':
        return this.count > 1 ? 'guest-detail-booking.travelers' : 'guest-detail-booking.traveler';
    }
  }
}
