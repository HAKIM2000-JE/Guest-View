import {Component, Input, OnInit} from '@angular/core';
import {PlatformAffiliateServices} from '../../../../models/guestview/PlatformAffiliateServices';
import {PropertyForGuest} from '../../../../models/guestview/PropertyForGuest';

@Component({
  selector: 'app-yaagov2-services-for-guests',
  templateUrl: './yaagov2-services-for-guests.component.html',
  styleUrls: ['./yaagov2-services-for-guests.component.scss']
})
export class Yaagov2ServicesForGuestsComponent implements OnInit {

  @Input() platformServices: PlatformAffiliateServices[];
  @Input() property: PropertyForGuest;

  constructor() { }

  ngOnInit() {
  }

}
