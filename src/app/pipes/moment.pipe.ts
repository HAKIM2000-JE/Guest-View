import { Pipe, PipeTransform } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  constructor(private translateService: TranslateService) {}

  transform(value: string | number | Date, language?: string, format: string = 'yaago', useAppLocal: boolean = false): any {
    const lang = language || navigator.language || window.navigator.language;
    const locale = useAppLocal ? moment.locale(this.translateService.currentLang) : moment.locale(lang);
    moment.locale(locale);
    if (value) {
      if ('yaago' === format ) {
        const date = moment(value);
        const day = date.format('dddd').substring(0, 3);
        const month = date.format('MMMM').substring(0, 3);
        return `${day} ${date.date()} ${month}`;
      } else {
        return moment(value).format(format);
      }
    } else {
      return '';
    }
  }

}
