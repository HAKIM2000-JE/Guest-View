import { Component, HostListener, Input, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";
import { GuestService } from "src/app/core/services/guest.service";
import { UtilsService } from "src/app/core/services/utils.service";
import { BookingForGuest } from "src/app/models/guestview/BookingForGuest";

@Component({
  selector: "app-guest-arrived-left",
  templateUrl: "./guest-arrived-left.component.html",
  styleUrls: ["./guest-arrived-left.component.scss"],
})
export class GuestArrivedLeftComponent implements OnInit {
  urlLang: string;
  showInfoCard: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
  screenWidth: number;
  constructor(
    public translateService: TranslateService,
    public guestService: GuestService,
    public utilService: UtilsService
  ) {
    this.getScreenWidth();
  }
  @Input() booking: BookingForGuest;
  @Input() property;
  ngOnInit() {
    var current = moment();

    if (
      moment(current).isSame(this.booking.startDate, "day") &&
      moment(current).isSame(this.booking.startDate, "month") &&
      moment(current).isSame(this.booking.startDate, "year")
    ) {
      this.isStartDate = true;
      if (this.booking.isArrived) {
        this.isStartDate = false;
      }
    } else if (
      moment(current).isSame(this.booking.endDate, "day") &&
      moment(current).isSame(this.booking.endDate, "month") &&
      moment(current).isSame(this.booking.endDate, "year")
    ) {
      this.isEndDate = true;
    }
    if (this.booking.isGone) {
      this.isEndDate = false;
    }
  }

  guestIn() {
    this.guestService
      .getPropertyAndBookingForGuestCheck(this.booking.id, "in")
      .subscribe((res) => {
        this.booking.isArrived = true;
        if ((this.booking.isArrived = true)) {
          this.isStartDate = false;
          console.log(res);
        }
      });
  }
  guestOut() {
    this.guestService
      .getPropertyAndBookingForGuestCheck(this.booking.id, "out")
      .subscribe((res) => {
        this.booking.isGone = true;

        if ((this.booking.isGone = true)) {
          this.isEndDate = false;
        }
      });
  }

  isDesktopMode(): boolean {
    return this.utilService.isDesktop(this.screenWidth);
  }
  @HostListener("window:resize", ["$event"])
  getScreenWidth(event?) {
    this.screenWidth = window.innerWidth;
  }
}
