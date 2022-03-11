import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot, UrlSegment} from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { GuestService } from "../../core/services/guest.service";
import { InternalPropertyService } from "../../core/services/internal.property.service";
import { GuestServiceIntern } from "./guest.service";
import {SecurityService} from "../../core/services/SecurityService";

@Injectable({
  providedIn: 'root'
})
export class GuestResolverService implements Resolve<any> {

  constructor(
    private guestService: GuestService,
    private router: Router,
    private propertyService: InternalPropertyService,
    private internGuestService: GuestServiceIntern,
    private securityService: SecurityService
    //private errorHandler: BugsnagChunkLoadErrorHandler
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const bookingId = route.children[0].params.bookingId;
    const lang = route.children[0].queryParams.lang ? route.children[0].queryParams.lang : undefined;

    return this.guestService.getPropertyAndBookingForGuest(bookingId, lang).pipe(
      mergeMap(res => {
        console.log("RES FROM GUESTPROPERTY", res);
        this.propertyService.setCurrentProperty(res.property);
        this.propertyService.localProperty = res.property;
        this.internGuestService.setBookingForGuest(res.booking);
        this.propertyService.setCurrentCorporate(res.corporate);

        console.log("Property --> ", this.propertyService.localProperty);
        console.log("Corporate --> ", this.propertyService.getCurrentCorporate());

        let urlForGuides = false;
        for (const segment of route.url) {
          if (segment.path === 'guides') {
            urlForGuides = true;
            break;
          }
        }
        if (!urlForGuides && res.booking == null && route && this.securityService.getSecurityPassword() !== 'YES' && res.corporate.bookletMasterKey != null) {
          console.log("route", route.children[0].url);
          console.log("No Booking");
          return this.router.navigate(['/pwd/' + bookingId + '/ask4pwd']);
        }

        //this.errorHandler.addMetadata(res.property.id, res.booking.id);
        return of(res);
      }),
      catchError(() => {
        return this.router.navigate(['/misc/lost']);
      })
    )
  }

}
