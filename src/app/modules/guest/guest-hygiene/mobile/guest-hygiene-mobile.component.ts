import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { GuestHygieneComponent } from '../guest-hygiene.component';
import { GuestService } from '../../../../core/services/guest.service';
import { UtilsService } from '../../../../core/services/utils.service';
import { InternalPropertyService } from '../../../../core/services/internal.property.service';
import { TranslateService } from '@ngx-translate/core';
import { animate, keyframes, style, transition, trigger } from "@angular/animations";
import {IntercomService} from '../../../../core/services/IntercomService';
import {LanguageManagementService} from "../../../../core/services/language.service";

@Component({
  selector: 'app-guest-hygiene-mobile',
  templateUrl: './guest-hygiene-mobile.component.html',
  styleUrls: ['./guest-hygiene-mobile.component.scss']
})
export class GuestHygieneMobileComponent extends GuestHygieneComponent {
  @Input() property;
  @ViewChild('listTop', {static: false}) listTop: ElementRef;
  @ViewChild('wrapper', {static: false}) wrapper: ElementRef;
  public fulldescription = false;
  panelOpenState = false;

  constructor(public guestService: GuestService,
              public utilService: UtilsService,
              public translateService: TranslateService,
              public internPropertyServices: InternalPropertyService,
              private renderer2: Renderer2,
              public intercomService: IntercomService,
              public languageService: LanguageManagementService
              ) {
    super(guestService, utilService, translateService, internPropertyServices, intercomService, languageService);
  }

  readmore() {
    this.fulldescription = !this.fulldescription;
    if (this.fulldescription) {
      const height = this.wrapper.nativeElement.offsetHeight;
      console.log(height);
      this.renderer2.setStyle(this.listTop.nativeElement, 'height', height + 'px');
    } else {
      this.renderer2.setStyle(this.listTop.nativeElement, 'height', '0px');
    }
  }
}
