import { Component, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {PropertyForGuest} from '../../../models/guestview/PropertyForGuest';
import {GuestService} from '../../../core/services/guest.service';
import {UtilsService} from "../../../core/services/utils.service";
import {InternalPropertyService} from "../../../core/services/internal.property.service";
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs';
import {takeUntil} from "rxjs/operators";
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import {AbstractWindow} from '../../../core/abstract/AbstractWindow';
import {IntercomService} from '../../../core/services/IntercomService';
import {CategoryTranslation, Hygiene} from '../../../models/Hygiene';
import {LanguageManagementService} from "../../../core/services/language.service";

@Component({
  selector: 'app-guest-hygiene',
  templateUrl: './guest-hygiene.component.html',
  styleUrls: ['./guest-hygiene.component.scss']
})



export class GuestHygieneComponent extends AbstractWindow implements OnInit, OnDestroy {

  @ViewChild('mytemplate', null) mytmpl: any;
  @ViewChild(NgxMasonryComponent, {static: false}) masonry: NgxMasonryComponent;

  property: PropertyForGuest;
  screenWidth: number;
  forceMajeursList: Hygiene;
  listForceMajeurTodisplay: CategoryTranslation[];

  constructor(public guestService: GuestService,
              public utilService: UtilsService,
              public translateService: TranslateService,
              public internPropertyServices: InternalPropertyService,
              public intercomService: IntercomService,
              public languageService: LanguageManagementService
  ) {
    super(intercomService, utilService);
  }

  masonryItems = Array(15).fill('test');

  public myOptions: NgxMasonryOptions = {
    horizontalOrder: true,
    originLeft: true,
    originTop: true,
    itemSelector: '.masonry-item',
  };

  ngOnInit() {

    console.log('hygiene language');
    console.log(this.translateService.currentLang);
    this.guestService.getListForceMajeurs(this.languageService.getLanguageInUrl()).subscribe(resp => {
    if (resp) {
      console.log(resp);
      this.forceMajeursList = resp;
      this.internPropertyServices.getCurrentProperty().pipe(takeUntil(this.onDestroy)).subscribe(property => {
        console.log('property:', property);
        if (property) {
          this.property = property;
          this.filterElement(this.forceMajeursList, this.property.forceMajeureItems);
          this.listForceMajeurTodisplay = this.forceMajeursList.categoryTranslations;
          // this.listForceMajeurTodisplay = this.forceMajeursList.categoryTranslations[0].categoryItems.filter(item => item.id !== 'lingeFornitures');
          // const lingeFornitures = this.forceMajeursList.find(item => item.id === 'lingeFornitures');
          // this.listForceMajeurTodisplay.push(lingeFornitures);

        }
      });
    }
    });
  }
  filterElement(arraySource: Hygiene , arrayfilter: string[]) {
    if ( arraySource && arrayfilter.length > 0) {
      arraySource.categoryTranslations.forEach(item => {
        item.categoryItems.forEach(forceMajeurItem => {
          item.categoryItems = item.categoryItems.filter(
            function(e) {
              return this.indexOf(e.itemCode) > -1;
            },
            arrayfilter
          );
        });
      });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }


  reload() {
    this.masonry.reloadItems();
    this.masonry.layout();
    document.getElementById('masonry_container').style.display = 'block';
  }
}
