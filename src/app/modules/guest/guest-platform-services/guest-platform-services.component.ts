import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {PlatformAffiliateServices} from '../../../models/guestview/PlatformAffiliateServices';
import {UtilsService} from '../../../core/services/utils.service';
import {PropertyForGuest} from '../../../models/guestview/PropertyForGuest';

@Component({
  selector: 'app-guest-platform-services',
  templateUrl: './guest-platform-services.component.html',
  styleUrls: ['./guest-platform-services.component.scss']
})
export class GuestPlatformServicesComponent implements OnInit {
  @ViewChild('mytemplate', null) mytmpl: any;
  @Input() platformServices: PlatformAffiliateServices[];
  @Input() property: PropertyForGuest;

  screenWidth: number;
  constructor(public utilService: UtilsService) {
    this.getScreenWidth();
  }

  ngOnInit() {

  }

  isDesktopMode(): boolean {
    return this.utilService.isDesktop(this.screenWidth);
  }

  @HostListener('window:resize', ['$event'])
  getScreenWidth(event?) {
    this.screenWidth = window.innerWidth;
  }
}


