import {Injectable} from '@angular/core';
import {Intercom} from 'ng-intercom';
import {IntercomSettings} from '../../models/intercom/IntercomSettings';

@Injectable({ providedIn: 'root' })
export class IntercomService {

  private settings: IntercomSettings;
  public isIntercomOpen = false;

  constructor(private intercom: Intercom) { }

  init() {
    this.settings = new IntercomSettings(window["intercomAppId"]);
    this.settings.hide_default_launcher = false; // hide on mobile
    this.intercom.boot(this.settings);
  }

  screenResize(isDesktopMode) {
    if (!isDesktopMode) {
      this.intercom.update({
        hide_default_launcher: true
      });
    } else {
      this.intercom.update({
        hide_default_launcher: true
      });
    }
  }

}
