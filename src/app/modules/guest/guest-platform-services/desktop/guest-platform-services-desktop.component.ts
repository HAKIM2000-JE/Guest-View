import {Component, Input, OnInit} from '@angular/core';
import {GuestPlatformServicesComponent} from "../guest-platform-services.component";
import {UtilsService} from "../../../../core/services/utils.service";
import {PropertyForGuest} from '../../../../models/guestview/PropertyForGuest';

@Component({
  selector: 'app-guest-platform-services-desktop',
  templateUrl: './guest-platform-services-desktop.component.html',
  styleUrls: ['./guest-platform-services-desktop.component.scss']
})
export class GuestPlatformServicesDesktopComponent extends GuestPlatformServicesComponent{
  @Input() property: PropertyForGuest;
  constructor(public utilService: UtilsService) {
    super(utilService);
  }

  ngOnInit() {
  }
}
