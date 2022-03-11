import { Component, OnInit } from '@angular/core';
import {AbstractWindow} from '../../../../core/abstract/AbstractWindow';
import {IntercomService} from '../../../../core/services/IntercomService';
import {UtilsService} from '../../../../core/services/utils.service';
import * as util from 'util';
import {takeUntil} from 'rxjs/operators';
import {GuestService} from '../../../../core/services/guest.service';
import {InternalPropertyService} from '../../../../core/services/internal.property.service';
import {LanguageManagementService} from '../../../../core/services/language.service';
import {TranslateService} from '@ngx-translate/core';
import {Property} from '../../../../models/Property';
import {PropertyForGuest} from '../../../../models/guestview/PropertyForGuest';
import {CategoryItem, Hygiene} from '../../../../models/Hygiene';

@Component({
  selector: 'app-yaagov2-hygiene',
  templateUrl: './yaagov2-hygiene.component.html',
  styleUrls: ['./yaagov2-hygiene.component.scss']
})
export class Yaagov2HygieneComponent extends AbstractWindow implements OnInit {

  property: PropertyForGuest;
  forceMajeursList: Hygiene;
  constructor(public intercomService: IntercomService,
              public utilsService: UtilsService,
              public guestService: GuestService,
              private translateService: TranslateService,
              public languageService: LanguageManagementService,
              public internPropertyServices: InternalPropertyService) {
    super(intercomService, utilsService);
  }

  ngOnInit() {
    //console.log('hygiene language');
    //console.log(this.translateService.currentLang);
    this.guestService.getListForceMajeurs(this.translateService.currentLang).subscribe(resp => {
      if (resp) {
        // console.log('hygiene-forceMajeureList', resp);
        this.forceMajeursList = resp;
        this.internPropertyServices.getCurrentProperty().pipe(takeUntil(this.onDestroy)).subscribe(property => {
          // console.log('hygiene-property:', property);
          if (property) {
            this.property = property;
            //this.filterElement(this.forceMajeursList, this.property.forceMajeureItems);
            //this.listForceMajeurTodisplay = this.forceMajeursList.categoryTranslations;
          }
        });
      }
    });
  }

  getCategoryInProperty(itemCode: string): boolean {
    let retBoolean = false;
    if (this.property) {
      if (this.property.forceMajeureItems.indexOf(itemCode) >= 0) {
        retBoolean = true;
      }
    }
    return retBoolean;
  }

  getCategoryItems(category: string): CategoryItem[] {
    let categoryItems = null;
    if (this.forceMajeursList) {
      this.forceMajeursList.categoryTranslations.forEach(ct => {
        if (ct.name === category) {
          categoryItems = ct.categoryItems;
        }
      });
    }
    return categoryItems;
  }

  isCategoryVisible(index: number): boolean {
    let categoryItems = null;
    let nbItemVisible = 0;
    if (this.forceMajeursList) {
      categoryItems =  this.forceMajeursList.categoryTranslations[index].categoryItems;
    }
    if (this.property) {
      //console.log(this.property.forceMajeureItems);
      categoryItems.forEach(cat => {
        if (this.property.forceMajeureItems.indexOf(cat.itemCode) >= 0) {
          nbItemVisible = nbItemVisible + 1;
        }
      });
    }
    // console.log('index: ' + index + ' categoryItems: ' + categoryItems.length + ' nbItemVisible:' + nbItemVisible);
    return nbItemVisible>0;
  }

  getCategoryIndex(index: number): CategoryItem[] {
    let categoryItems = null;
    if (this.forceMajeursList) {
      categoryItems =  this.forceMajeursList.categoryTranslations[index].categoryItems;
    }
    return categoryItems;
  }

}
