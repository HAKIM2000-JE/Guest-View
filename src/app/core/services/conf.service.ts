import {Injectable} from '@angular/core';
import {ConfigService} from '@ngx-config/core';

@Injectable({
  providedIn: 'root'
})
export class ConfService {

  constructor(private config: ConfigService) {
  }

  getBackendApiEndPoint() {
    try {
      const  url: string = this.config.getSettings('system.apiEndPoint');
      if (url == null || url.trim() === '') {
        return window.location.origin;
      } else {
        return url;
      }
    } catch (exception) {
      console.log(exception);
      return window.location.origin;
    }
  }

}
