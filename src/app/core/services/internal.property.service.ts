import {BehaviorSubject, Observable} from 'rxjs';
import {Property} from '../../models/Property';
import {Injectable} from '@angular/core';
import {Photo} from '../../models/Photo';
import {PropertyForGuest} from '../../models/guestview/PropertyForGuest';
import {Corporate} from "../../models/guestview/Corporate";

@Injectable({
  providedIn: 'root'
})
export class InternalPropertyService {


  public localProperty: PropertyForGuest = null;
  private currentCorporate = null;
  private _currentProperty = new BehaviorSubject<PropertyForGuest>(undefined);
  private currentProperty$ = this._currentProperty.asObservable();
  private _currentPhotoIndex: number = 0;

  setCurrentCorporate(corporate: Corporate) {
    this.currentCorporate = corporate;
  }

  getCurrentCorporate(): Corporate {
    return this.currentCorporate;
  }

  getCurrentProperty(): Observable<PropertyForGuest> {
    return this.currentProperty$;
  }

  setCurrentProperty(property: PropertyForGuest) {
    this._currentProperty.next(property);
    this.localProperty = property;
  }

  getMainPhotoUrl(): Photo {
    let ret = null;
    let index = -1;
    this.currentProperty$.subscribe( p => {
      if (p.photos) {
        p.photos.forEach( photo => {
          index ++;
          if (photo.main) {
            ret = photo;
            this._currentPhotoIndex = index;
            photo.url = photo.url.replace('aki_policy=medium', 'aki_policy=large');
            return ret;
          }
        });

        if (ret == null && p.photos.length > 0) {
          ret = p.photos[0];
          this._currentPhotoIndex = 0;
          ret.url = ret.url.replace('aki_policy=medium', 'aki_policy=large');
          return ret;
        }

      }
    });

    return ret;
  }

  getNextPhoto(): Photo {
    let photo = null;
    this.currentProperty$.subscribe( p => {
      if (this._currentPhotoIndex === p.photos.length - 1) {
        this._currentPhotoIndex = -1;
      }
      photo = p.photos[this._currentPhotoIndex + 1];
      this._currentPhotoIndex = this._currentPhotoIndex + 1;
      photo.url = photo.url.replace('aki_policy=medium', 'aki_policy=large');
    });
    return photo;
  }

  getPreviousPhoto(): Photo {
    let photo = null;
    this.currentProperty$.subscribe( p => {
      if (this._currentPhotoIndex === 0) {
        this._currentPhotoIndex = p.photos.length;
      }
      photo = p.photos[this._currentPhotoIndex - 1];
      this._currentPhotoIndex = this._currentPhotoIndex - 1;
      photo.url = photo.url.replace('aki_policy=medium', 'aki_policy=large');
    });

    return photo;
  }

}
