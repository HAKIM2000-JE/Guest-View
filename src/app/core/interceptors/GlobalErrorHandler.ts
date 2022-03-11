import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {GoogleAnalyticsService} from 'ngx-google-analytics';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private zone: NgZone, private ga: GoogleAnalyticsService) {}

  handleError(error: Error) {

    this.zone.run(() => {
        console.error('Error from global error handler', error);
        this.ga.exception(error.message ? error.message : 'Unknown error occurred');
    }
    );
  }
}
