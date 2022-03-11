import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {LoaderType} from "../../models/LoaderType";

@Injectable({providedIn: 'root'})
export class Yaago2LoaderService {

  static readonly FULL = 'full';
  private showLoaderSubjectLoader2 = new Subject<LoaderType>();
  showLoaderEvent$ = this.showLoaderSubjectLoader2.asObservable();
  private dismissLoaderSubjectLoader2 = new Subject();
  dismissLoaderEvent$ = this.dismissLoaderSubjectLoader2.asObservable();

  constructor() {
  }

  openLoader(message?: string) {
    this.showLoaderSubjectLoader2.next(new LoaderType(Yaago2LoaderService.FULL, message));
  }
  closeLoader() {
    this.dismissLoaderSubjectLoader2.next();
  }
}

