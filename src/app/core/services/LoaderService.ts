import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {LoaderType} from "../../models/LoaderType";
import {Yaago2LoaderService} from "./Yaago2-LoaderService";

@Injectable({providedIn: 'root'})
export class LoaderService {

  static readonly FULL = 'full';
  static readonly BAR = 'bar';

  private showLoaderSubject = new Subject<LoaderType>();
  showLoaderEvent$ = this.showLoaderSubject.asObservable();
  private dismissLoaderSubject = new Subject();
  dismissLoaderEvent$ = this.dismissLoaderSubject.asObservable();

  constructor(private yaago2LoaderService: Yaago2LoaderService) {
  }

  showFullLoader(message?: string) {
    this.showLoaderSubject.next(new LoaderType(LoaderService.FULL, message));
  }

  showBarLoader() {
    // this.showLoaderSubject.next(new LoaderType(LoaderService.BAR));
  }

  dismissLoader() {
    this.dismissLoaderSubject.next();
  }
}
