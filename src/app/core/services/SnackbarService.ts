import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {SnackbarMessage} from "../../models/snackbar/SnackbarMessage";

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private dismissTimeout = 5000;
  private timeout;
  private message = new Subject<SnackbarMessage>();
  readonly newMessageEvent$ = this.message.asObservable();
  constructor() {}
  setDismissTimeout(timeout: number) {
    this.dismissTimeout = timeout;
  }
  push(message: SnackbarMessage) {
    console.log('snackbarpush');
    this.message.next(message);
    if (this.timeout) { clearTimeout(this.timeout); }
    if (message && (message.type === 'info' || message.type === 'warning')) {
      this.timeout = setTimeout(() => {
        this.dismiss();
      }, this.dismissTimeout);
    }
  }
  dismiss() {
    this.push(undefined);
  }
}
