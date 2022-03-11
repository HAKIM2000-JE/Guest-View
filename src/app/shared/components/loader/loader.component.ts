import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {takeUntil} from 'rxjs/operators';
import {AbstractWindow} from '../../../core/abstract/AbstractWindow';
import {AnimationOptions} from 'ngx-lottie';
import {LoaderService} from "../../../core/services/LoaderService";
import {IntercomService} from "../../../core/services/IntercomService";
import {UtilsService} from "../../../core/services/utils.service";
import {LoaderType} from "../../../models/LoaderType";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent extends AbstractWindow implements OnInit, OnDestroy {

  showFull = false;
  showBar = false;
  mainText: string;
  options: AnimationOptions = {
    path: '/assets/images/yaago2-loader/animation.json',
  };
  private clickHandler: any = this.preventClick.bind(this);

  constructor(private loaderService: LoaderService,
              public intercomService: IntercomService,
              public utilsService: UtilsService,
              public translateService: TranslateService) {
    super(intercomService, utilsService);
  }

  ngOnInit() {
    console.log('yaago1LoaderService OnInit');

    this.loaderService.showLoaderEvent$.pipe(takeUntil(this.onDestroy)).subscribe((value: LoaderType) => {
      this.showFull = value.type === LoaderService.FULL;
      this.showBar = value.type === LoaderService.BAR;
      if (value.message != null && value.message !== '') {
        this.mainText = this.translateService.instant(value.message);
      } else {
        this.mainText = '';
      }

      // Prevent all click when bar loader is shown. Enable click again after 10sec.
      if (this.showBar) {
        document.addEventListener('click', this.clickHandler, true);
        setTimeout(() => {
          this.enableClick();
        }, 10000);
      }
    });

    this.loaderService.dismissLoaderEvent$.pipe(takeUntil(this.onDestroy)).subscribe(_ => {
      if (this.showBar) {
        this.enableClick();
      }

      this.showFull = false;
      this.showBar = false;
      this.mainText = undefined;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.enableClick();
  }

  preventClick(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
  }

  enableClick() {
    document.removeEventListener('click', this.clickHandler, true);
  }

  closeLoader() {
    this.loaderService.dismissLoader();
  }
}
