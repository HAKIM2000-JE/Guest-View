import {HostListener} from '@angular/core';
import {Subject} from 'rxjs';
import {IntercomService} from '../services/IntercomService';
import {UtilsService} from '../services/utils.service';
import {PersonForGuest} from '../../models/guestview/PersonForGuest';
import {CoHostInCharge} from '../../models/guestview/PropertyForGuest';

export abstract class AbstractWindow {
  screenWidth: number;
  onDestroy = new Subject();
  protected constructor(public intercomService: IntercomService,
                        public utilsService: UtilsService) {
    this.screenWidth = window.innerWidth;
  }
  @HostListener('window:resize', ['$event'])
  getScreenWidth(event?) {
    this.screenWidth = window.innerWidth;
    this.intercomService.screenResize(this.utilsService.isDesktop(this.screenWidth));
  }
  isDesktopMode() {
    return this.utilsService.isDesktop(this.screenWidth);
  }
  manageServiceWorker() {
    if (this.isServiceWorkerCompatible(window)) {
      console.log('Service worker register...');
      // console.log(navigator);
      if (navigator.serviceWorker) {
        navigator.serviceWorker.register('/ngsw-worker.js', { scope: '/' })
          .then( (reg) => {
              console.log('Service worker registration succeeded:', reg);
            },
            (err) => {
              console.log('Service worker registration failed:', err);
            }
          );
      }
    }
  }
  public isServiceWorkerCompatible(window: Window): boolean {
    /*console.log('Window Agent : ' + window.navigator.userAgent
      + ' | ' + 'IsSafari:' + this.isSafari(window) +
      ' | ' + 'isIOS:' + this.isIOS(window) +
      ' | ' + 'isEdgePrivateMode:' + this.isEdgePrivateMode(window) +
      ' | ' + 'isPrivateMode:' + !window.indexedDB);*/
    return (
      !this.isIOS(window) &&
      !this.isSafari(window) &&
      !this.isEdgePrivateMode(window)
    );
  }
  private isIOS(window: Window): boolean {
    return ['iPad', 'iPhone', 'iPod'].indexOf(window.navigator.platform) >= 0;
  }
  private isSafari(window: Window): boolean {
    return (
      window.navigator.userAgent.search('Safari') >= 0 &&
      window.navigator.userAgent.search('Chrome') < 0
    );
  }
  private isEdge(window: Window): boolean {
    return window.navigator.userAgent.indexOf('Edge/') >= 0;
  }
  isEdgePrivateMode(window: Window) {
    let isPrivate = false;
    if (this.isEdge(window)) {
      try {
        if (!window.indexedDB) {
          isPrivate = true;
        }
      } catch (e) {
        isPrivate = true;
      }
    }
    return isPrivate;
  }



}
