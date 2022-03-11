import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractWindow} from '../../../../core/abstract/AbstractWindow';
import {Guide, DocType} from '../../../../models/Guide';
import {IntercomService} from '../../../../core/services/IntercomService';
import {UtilsService} from '../../../../core/services/utils.service';
import {PropertyForGuest} from "../../../../models/guestview/PropertyForGuest";

@Component({
  selector: 'app-guide-details',
  templateUrl: './guest-guide-details.component.html',
  styleUrls: ['./guest-guide-details.component.scss']
})
export class GuestGuideDetailsComponent extends AbstractWindow implements OnInit {

  @Input() guide: Guide;
  @Input() property: PropertyForGuest;
  DocType = DocType;

  mobileDocListOpened = false;
  showingSlider = false;
  sliderIndex = 0;

  constructor(public intercomService: IntercomService,
              public translateService: TranslateService,
              public utilsService: UtilsService) {
    super(intercomService, utilsService);
  }

  ngOnInit(): void {
    /*if (this.guide.category !== 'wifi' ) {
      this._hasNext = this.hasNext();
      this._hasPrevious = this.hasPrevious();
    }*/
  }

  divScroll(el: any, direction: string) {
    el.scrollTo({
      behavior: 'smooth',
      left: direction === 'left' ? el.scrollLeft - 340 : el.scrollLeft + 340, // 330 is the bloc width set on the css
    });
  }

  getWifiCode() {
    let returnString = 'WIFI:S:' + this.guide.translations[0].title + ';T:' + this.guide.translations[0].wifiSecurityProtocol + ';P:' + this.guide.translations[0].description + ';';
    if (this.guide.translations[0].wifiHidden) {
      returnString += 'S:true;';
    } else {
      returnString += ';';
    }
    return returnString;
  }

  getWifiUrl() {
    let returnString = 'wifi://' + this.guide.translations[0].description + '@' + this.guide.translations[0].title + ';';
    if (this.guide.translations[0].wifiHidden) {
      returnString += 'S:true;';
    } else {
      returnString += ';';
    }
    return returnString;
  }

  getCleanTextToRead(desc: string) {
    if (!desc) {
      return;
    }
    let textToSpeech = desc.replace(/<[^>]*>/g, ' ');
    textToSpeech = textToSpeech.replace(/&nbsp;/gi, ' ');
    // textToSpeech = textToSpeech.replace(/^https?:\/\/.*[\r\n]*/g, ' ');
    return textToSpeech;
  }

  showSlider(i) {
    this.sliderIndex = i;
    this.showingSlider = true;
  }

  next() {
    if (!this.guide || !this.guide.documents || this.guide.documents.length === 0) {
      return;
    }
    if (this.sliderIndex === this.guide.documents.length - 1) {
      this.sliderIndex = 0;
    } else {
      this.sliderIndex++;
    }
  }

  previous() {
    if (!this.guide || !this.guide.documents || this.guide.documents.length === 0) {
      return;
    }
    if (this.sliderIndex === 0) {
      this.sliderIndex = this.guide.documents.length - 1;
    } else {
      this.sliderIndex--;
    }
  }
  openLink(url: string) {
    window.open(url, '_blank');
  }
}
