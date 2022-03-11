import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Corporate} from '../../../models/guestview/Corporate';
import {UtilsService} from '../../../core/services/utils.service';

@Component({
  selector: 'app-guest-footer-page',
  templateUrl: './guest-footer-page.component.html',
  styleUrls: ['./guest-footer-page.component.scss']
})
export class GuestFooterPageComponent implements OnInit {
  screenWidth: number;
  @Input() corporate: Corporate;
  constructor( private utilService: UtilsService) {
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
