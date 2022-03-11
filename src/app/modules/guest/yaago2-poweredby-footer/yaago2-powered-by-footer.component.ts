import {Component, Input, OnInit} from '@angular/core';
import {AbstractWindow} from '../../../core/abstract/AbstractWindow';
import {IntercomService} from '../../../core/services/IntercomService';
import {UtilsService} from '../../../core/services/utils.service';
import {Corporate} from '../../../models/guestview/Corporate';

@Component({
  selector: 'app-yaago2-powered-by-footer',
  templateUrl: './yaago2-powered-by-footer.component.html',
  styleUrls: ['./yaago2-powered-by-footer.component.scss']
})
export class Yaago2PoweredByFooterComponent extends AbstractWindow implements OnInit {

  @Input() corporate: Corporate;

  constructor(public intercomService: IntercomService,
              public utilsService: UtilsService) {
    super(intercomService, utilsService);
  }

  ngOnInit() {
  }

  getFooterBackground() {
    if (!this.corporate) {
      return '#03224C';
    }
    if (this.corporate.yaagoFooterBackgroundColor) {
      return this.corporate.yaagoFooterBackgroundColor;
    }
    if (this.corporate.primaryColor) {
      return this.corporate.primaryColor;
    }
    return '#03224C';
  }

  getTextColor() {
    if (!this.corporate) {
      return '#FFFFFF';
    }
    if (this.corporate.yaagoFooterTextColor) {
      return this.corporate.yaagoFooterTextColor;
    }
    if (this.corporate.catskillColor) {
      return this.corporate.catskillColor;
    }
    return '#FFFFFF';
  }
}
