import {Component, Input, OnInit} from '@angular/core';
import {UpsaleCategoryAndProductDto} from "../../../../models/guestview/upsale/UpsaleCategoryAndProductDto";
import {UpsaleProductDto} from "../../../../models/guestview/upsale/UpsaleProductDto";
import {BookingForGuest} from "../../../../models/guestview/BookingForGuest";
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {GuestService} from "../../../../core/services/guest.service";
import {ApiService} from "../../../../core/http/api.service";
import {TranslateService} from "@ngx-translate/core";
import {PropertyForGuest} from "../../../../models/guestview/PropertyForGuest";
import {LanguageManagementService} from "../../../../core/services/language.service";
import {AbstractWindow} from "../../../../core/abstract/AbstractWindow";
import {UtilsService} from "../../../../core/services/utils.service";
import {IntercomService} from "../../../../core/services/IntercomService";

@Component({
  selector: 'app-upsale-category-list',
  templateUrl: './upsale-category-list.component.html',
  styleUrls: ['./upsale-category-list.component.scss']
})
export class UpsaleCategoryListComponent extends AbstractWindow implements OnInit {

  bookingId: string;
  property: PropertyForGuest;
  @Input() booking: BookingForGuest;
  @Input() upsaleCategoryAndProductDtos: UpsaleCategoryAndProductDto[] = [];
  currentProductList: UpsaleProductDto[] = null;
  currentCategoryId: string = '';

  constructor(public router: Router,
              private route: ActivatedRoute,
              private apiService: ApiService,
              private translate: TranslateService,
              public intercomService: IntercomService,
              public utilService: UtilsService,
              private languageService: LanguageManagementService,
              private guestService: GuestService) {
    super(intercomService, utilService);
  }

  ngOnInit() {
    this.route.paramMap.subscribe( ParamMap => {
      this.bookingId = ParamMap.get('bookingId');
      this.apiService.getUpsales(this.bookingId, this.translate.currentLang).subscribe( upsales => {
        this.upsaleCategoryAndProductDtos = upsales;
      });
      this.guestService.getPropertyAndBookingForGuest( this.bookingId , this.languageService.getLanguageInUrl()).pipe(takeUntil(this.onDestroy)).subscribe( res => {
        this.property = res.property;
      });
    });
  }

  setCurrentCategory(category: UpsaleCategoryAndProductDto) {
    this.currentCategoryId = category.categoryId;
    let previousProduct: UpsaleProductDto = new UpsaleProductDto();
    previousProduct.productTitle = 'Previous';
    this.currentProductList = [];
    this.currentProductList.push(previousProduct);
    this.currentProductList.push(...category.products);
    this.router.navigate(['/guest/' + this.booking.id  + '/upsaleselector']).then();
  }

  setCurrentProduct(product: UpsaleProductDto) {
    if (product.productTitle === 'Previous') {
      this.currentProductList = null;
    }
  }


  getPrice(product: UpsaleProductDto) {
    if (product.fixedPrice != null) {
      return product.fixedPrice.amount;
    } else if (product.conditionalPrices != null) {
      return product.conditionalPrices[0].conditionalPrice.amount;
    }
  }

  getCurrency(product: UpsaleProductDto) {
    if (product.fixedPrice != null) {
      return product.fixedPrice.currency;
    } else if (product.conditionalPrices != null) {
      return product.conditionalPrices[0].conditionalPrice.currency;
    }
  }


}
