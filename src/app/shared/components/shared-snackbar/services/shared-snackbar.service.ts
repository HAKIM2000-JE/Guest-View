import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {SnackbarMessage} from '../models/snackbar-message';

@Injectable({ providedIn: 'root' })
export class SharedSnackbarService {

  private _message = new Subject<SnackbarMessage>();
  readonly newMessageEvent$ = this._message.asObservable();

  private dismissTimeout: number = 3000;
  private timeout;

  constructor() {}

  setDismissTimeout(timeout: number) {
    this.dismissTimeout = timeout;
  }

  push(message: SnackbarMessage) {
    this._message.next(message);
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

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
