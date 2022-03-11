import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';
import {SharedSnackbarService} from '../../shared/components/shared-snackbar/services/shared-snackbar.service';
import {SnackbarMessage} from '../../shared/components/shared-snackbar/models/snackbar-message';
import {HttpErrorResponse} from '@angular/common/http';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {DocType} from "../../models/Guide";
import {PropertyBooking} from '../../models/PropertyBooking';
import {BookingForGuest} from '../../models/guestview/BookingForGuest';
import {PersonForGuest} from '../../models/guestview/PersonForGuest';
import {CoHostInCharge} from '../../models/guestview/PropertyForGuest';
import {Corporate} from "../../models/guestview/Corporate";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(private translateService: TranslateService,
              private snackbarService: SharedSnackbarService,
              private  sanitizer: DomSanitizer) {
  }

  public manageCorporateColors(corporate: Corporate) {
    if (corporate != null) {
      if (corporate.primaryColor) {
        document.documentElement.style.setProperty('--dunnessant-color', corporate.primaryColor);
      }
      if (corporate.forgetMeNotColor) {
        document.documentElement.style.setProperty('--forgetMeNot-color', corporate.forgetMeNotColor);
      }
      if (corporate.greenVogueColor) {
        document.documentElement.style.setProperty('--greenVogue-color', corporate.greenVogueColor);
      }
      if (corporate.catskillColor) {
        document.documentElement.style.setProperty('--catSkill-color', corporate.catskillColor);
      }

    }
  }

  static readonly languageArray: string[] = ['fr', 'en', 'de', 'es', 'it', 'nl', 'da', 'pt', 'ja',  'no', 'pl',  'ru', 'sv', 'tr', 'zh'];

  public static isLanguageSupported(guestLanguage: string): string {
    for (const i18nlanguage of this.languageArray) {
      console.log("i18nLangaue", i18nlanguage.toLocaleLowerCase());
      console.log("guestLanguage", guestLanguage.toLocaleLowerCase());
      if (i18nlanguage.toLowerCase().indexOf(guestLanguage.toLocaleLowerCase()) >= 0) {
        return i18nlanguage;
      }
    }
    return "en";
  }

  static readonly mapFlag: Map<string, string> = new Map([
      ['English', '../../../../assets/flags/english-flag.png'],
      ['en', '../../../../assets/flags/english-flag.png'],
      ['Français',  '../../../../assets/flags/french-flag.png'],
      ['fr',  '../../../../assets/flags/french-flag.png'],
      ['no',  '../../../../assets/flags/norwegian-flag.png'],
      ['Español', '../../../../assets/flags/spanish-flag.png'],
      ['es', '../../../../assets/flags/spanish-flag.png'],
      ['Italian', '../../../../assets/flags/italian-flag.png'],
      ['it', '../../../../assets/flags/italian-flag.png'],
      ['Deutsch', '../../../../assets/flags/deutsch-flag.png'],
      ['de', '../../../../assets/flags/deutsch-flag.png'],
      ['Portuguese', '../../../../assets/flags/portuguese-flag.png'],
      ['pt', '../../../../assets/flags/portuguese-flag.png'],
      ['中文', '../../../../assets/flags/china-flag.jpg'],
      ['zh', '../../../../assets/flags/china-flag.jpg'],
      ['Magyar', '../../../../assets/flags/hungary-flag.jpg'],
      ['hu', '../../../../assets/flags/hungary-flag.jpg'],
      ['Polski', '../../../../assets/flags/poland-flag.jpg'],
      ['pl', '../../../../assets/flags/poland-flag.jpg'],
      ['ru', '../../../../assets/flags/russia-flag.jpg'],

      ['Dansk', '../../../../assets/flags/danemark-flag.png'],
      ['da', '../../../../assets/flags/danemark-flag.png'],
      ['Norsk', '../../../../assets/flags/norway-flag.png'],
      ['no', '../../../../assets/flags/norway-flag.png'],
      ['Svenska', '../../../../assets/flags/sweden-flag.png'],
      ['sv', '../../../../assets/flags/sweden-flag.png'],
      ['tr', '../../../../assets/flags/Turkey.svg'],
      ['nl', '../../../../assets/flags/nederland.jpeg'],
      ['ja', '../../../../assets/flags/japan-flag.jpg'],
      ['us', '../../../../assets/flags/american-flag.png'],
      ['br', '../../../../assets/flags/brazil.png'],
      ['ca', '../../../../assets/flags/canadian.jpg'],
      ['Русский', '../../../../assets/flags/russia-flag.jpg']
    ]
  );


  static formatDate(date: string): string {
    // TO DO NICE TO HAVE FORMAT US format
    // return moment(date.substring(0, date.lastIndexOf('['))).format('DD/MM/YYYY h:mm:ss A');
    let ret = '';
    if (date && date !== '') {
      ret = moment(date).format('DD, MMM');
    }
    return ret;
  }

  static formatDateWithLocale(date: string, locale: string): string {
    // TO DO NICE TO HAVE FORMAT US format
    // return moment(date.substring(0, date.lastIndexOf('['))).format('DD/MM/YYYY h:mm:ss A');
    let ret = '';
    if (date && date !== '') {
      ret = moment(date).locale(locale).format('DD, MMM');
    }
    return ret;
  }

  static getLanguageFlag(code: string) {
    return this.mapFlag.get(code);
  }
  isDesktop(windowWidth: number): boolean {
    return windowWidth >= 1024;
  }
  isDesktopForMenu(windowWidth: number): boolean {
    return windowWidth >= 1300;
  }

  handleYaagoErrorCode(error: HttpErrorResponse) {
    if (error.status === 400) {
      this.snackbarService.push(new SnackbarMessage(
        this.translateService.instant('yaago-error-code.' + error.headers.get('yaago-error-code')), 'error'));
    } else {
      this.snackbarService.push(new SnackbarMessage(error.message, 'error'));
    }
  }

  displayDistance(distance: number) {
    // console.log(distance);
    if (distance > 0) {
      return distance.toFixed(2) + ' km';
    } else {
      return (distance * 100) + ' m';
    }
  }

  isYoutubeUrl(url: string): boolean {
    return (url.toLowerCase().indexOf('youtube', 0) >= 0);
  }

  groupByKey(array, key) {
    // Return the end result
    if (array) {
      return array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result;
      }, []); // empty object is the initial value for result object
    }
  }

  groupByKey2(array, key, key2) {
    // Return the end result
    if (array) {
      return array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object

        if (currentValue[key2] !=null && currentValue[key2] !== '') {
          (result[currentValue[key2]] = result[currentValue[key2]] || []).push(
            currentValue
          );
        } else {

          (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
          );
        }
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result;
      }, []); // empty object is the initial value for result object
    }
  }

  sanitizeVideoUrl(url: string): SafeResourceUrl {
    if (url && url.trim() !== '') {
      /*const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*!/;
      const match = url.match(regExp);*/
      const youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const vimeoRegex = /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i;
      const dailyMotionRegex = /^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/i;

      const matchYoutube = url.match(youtubeRegExp);
      const matchVimeo = url.match(vimeoRegex);
      const matchDailyMotion = url.match(dailyMotionRegex);

      if (matchYoutube && matchYoutube[2].length === 11) {
        url = url.replace(url, 'https://www.youtube.com/embed/' + matchYoutube[2]);
      }

      if (matchVimeo && matchVimeo[1].length > 0) {
        url = url.replace(url, 'https://player.vimeo.com/video/' + matchVimeo[1]);
      }

      if (matchDailyMotion && matchDailyMotion[2].length > 0) {
        url = url.replace(url, 'https://www.dailymotion.com/embed/video/' + matchDailyMotion[2]);
      }
      // if (url.startsWith('https://youtu.be/')) {
      //   url = url.replace('https://youtu.be/', 'https://www.youtube.com/embed/');
      // } else {
      //   url = url.replace('watch?v=', 'embed/');
      // }
      // this.currentTranslation.video = url;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  videoUrlType(url: string): DocType {
    if (url == null || url.trim() === '') {
      return null;
    }
    const youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const vimeoRegex = /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i;
    const dailyMotionRegex = /^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/i;

    const matchYoutube = url.match(youtubeRegExp);
    const matchVimeo = url.match(vimeoRegex);
    const matchDailyMotion = url.match(dailyMotionRegex);

    if (matchYoutube && matchYoutube[2].length === 11) {
      return DocType.YOUTUBE;
    }

    //console.log('VIMEO-MATCH', matchVimeo);
    if (matchVimeo && matchVimeo[1].length > 0) {
      return DocType.VIMEO;
    }

    //console.log('DailyMotion-MATCH', matchDailyMotion);
    if (matchDailyMotion && matchDailyMotion[2].length > 0) {
      return DocType.DAILYMOTION;
    }


    return DocType.EXTERNAL_VIDEO;
  }

  getTheKeysCode(propertyBooking: BookingForGuest): string {
    let retCode = '';
    if (propertyBooking.theKeysAccesses) {
      propertyBooking.theKeysAccesses.forEach( access => {
        if (access.accessoryType === 'Digicode') {
          retCode = access.code;
        }
      });
      return retCode;
    }
  }

  getTheKeysLink(propertyBooking: BookingForGuest): string {
    let retCode = '';
    if (propertyBooking.theKeysAccesses) {
      propertyBooking.theKeysAccesses.forEach( access => {
        if (access.accessoryType === 'Gateway') {
          retCode = access.code;
        }
      });
      return retCode;
    }
  }

  getCleanTextToRead(desc: string) {
    if (!desc) {
      return;
    }
    let textToSpeech = desc.replace(/<[^>]*>/g, ' ');
    textToSpeech = textToSpeech.replace(/&nbsp;/gi, ' ');
    // textToSpeech = textToSpeech.replace(/^https?:\/\/.*[\r\n]*/g, ' ');
    return textToSpeech;
  }

  static getNonTranslatedLanguageName( languageCode: string) {
    switch (languageCode) {
      case 'fr':
        return 'Français';
      case 'en':
        return 'English';
      case 'us':
        return 'American';
      case 'de':
        return 'Deutsch';
      case 'es':
        return 'Español';
      case 'it':
        return 'Italiano';
      case 'nl':
        return 'Nederlands';
      case 'pt':
        return 'português';
      case 'da':
        return 'Dansk';
      case 'no':
        return 'Norsk';
      case 'ru':
        return 'русский';
      case 'pl':
        return 'Polskie';
      case 'sv':
        return 'Svenska';
      case 'tr':
        return 'Türk';
      case 'zh':
        return '中国人';
      case 'br':
        return 'Brazil';
      case 'ja':
        return '日本';
      case 'ca':
        return 'Canadian';
    }
  }

  formatDateTime(date: string): string {
    // TO DO NICE TO HAVE FORMAT US format
    // return moment(date.substring(0, date.lastIndexOf('['))).format('DD/MM/YYYY h:mm:ss A');
    let ret = '';
    if (date != null && date !== '') {
      moment.locale(this.translateService.currentLang);
      ret = moment(date).format('DD/MM/YYYY HH:mm');
    }
    return ret;
  }

  getFirstLetter(host: PersonForGuest | CoHostInCharge) {
    if (!host) {
      return '';
    }
    if (host.firstName) {
      return host.firstName.substr(0, 1);
    }
    if (host.lastName) {
      return host.lastName.substr(0, 1);
    }
    if (host.email) {
      return host.email.substr(0, 1);
    }
  }

}
