import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageManagementService {
  constructor() { }

  private languageInUrl: string;

  setLanguageInUrl(lang: string) {
    this.languageInUrl = lang;
  }

  getLanguageInUrl() {
    return this.languageInUrl;
  }

}
