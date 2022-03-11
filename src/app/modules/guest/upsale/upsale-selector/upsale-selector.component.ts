import {Component, Input, OnInit} from '@angular/core';
import {AbstractWindow} from "../../../../core/abstract/AbstractWindow";
import {ActivatedRoute, Router} from "@angular/router";
import {IntercomService} from "../../../../core/services/IntercomService";
import {SharedSnackbarService} from "../../../../shared/components/shared-snackbar/services/shared-snackbar.service";
import {TranslateService} from "@ngx-translate/core";
import {ApiService} from "../../../../core/http/api.service";
import {UtilsService} from "../../../../core/services/utils.service";
import {LanguageManagementService} from "../../../../core/services/language.service";
import {GuestService} from "../../../../core/services/guest.service";
import {UpsaleCategoryAndProductDto} from "../../../../models/guestview/upsale/UpsaleCategoryAndProductDto";
import {takeUntil} from "rxjs/operators";
import {PropertyForGuest} from "../../../../models/guestview/PropertyForGuest";
import {UpsaleProductDto} from "../../../../models/guestview/upsale/UpsaleProductDto";
import {ConditionalPrice} from "../../../../models/guestview/upsale/ConditionalPrice";
import {GuestOrder} from "../../../../models/guestview/upsale/GuestOrder";
import {OrderProduct} from "../../../../models/guestview/upsale/OrderProduct";
import {Amount} from "../../../../models/guestview/Amount";

@Component({
  selector: 'app-upsale-selector',
  templateUrl: './upsale-selector.component.html',
  styleUrls: ['./upsale-selector.component.scss']
})
export class UpsaleSelectorComponent extends AbstractWindow implements OnInit {

  bookingId: string;
  property: PropertyForGuest;
  upsaleCategoryAndProductDtos: UpsaleCategoryAndProductDto[] = [];
  currentProductList: UpsaleProductDto[] = null;
  currentProduct: UpsaleProductDto = null;
  selectedCategory: UpsaleCategoryAndProductDto = null;
  currentProductCondition: ConditionalPrice;
  currentGuestOrder: GuestOrder = new GuestOrder();

  constructor(private router: Router,
              private route: ActivatedRoute,
              public intercomService: IntercomService,
              private snackbar: SharedSnackbarService,
              private translate: TranslateService,
              private apiService: ApiService,
              public utilService: UtilsService,
              private languageService: LanguageManagementService,
              private guestService: GuestService) {
    super(intercomService, utilService);
  }

  ngOnInit() {

    this.currentGuestOrder = JSON.parse(localStorage.getItem("basket"));
    console.log("this.currentGuestOrder", this.currentGuestOrder);
    if (this.currentGuestOrder == null) {
      this.currentGuestOrder = new GuestOrder();
    }
    this.currentGuestOrder.orderTotalAmount = new Amount();
    this.currentGuestOrder.orderTotalAmount.amount = 0;
    this.currentGuestOrder.orderTotalAmount.currency = "EUR";



    this.route.paramMap.subscribe( ParamMap => {
      this.bookingId = ParamMap.get('bookingId');
      this.apiService.getUpsales(this.bookingId,this.translate.currentLang).subscribe( upsales => {
        this.upsaleCategoryAndProductDtos = upsales;
        if (upsales.length >0) {
          this.setCurrentCategory(upsales[0]);
        }
      });
      this.guestService.getPropertyAndBookingForGuest( this.bookingId , this.languageService.getLanguageInUrl()).pipe(takeUntil(this.onDestroy)).subscribe( res => {
        this.property = res.property;
      });
    });
  }




  setCurrentCategory(category: UpsaleCategoryAndProductDto) {
    this.selectedCategory = category;
    this.currentProduct = null;
    this.currentProductCondition = null;
    this.currentProductList = [];
    this.currentProductList.push(...category.products);
  }

  setCurrentProduct(product: UpsaleProductDto) {
    this.currentProductList = null;
    this.currentProductCondition = null;
    this.currentProduct = product;
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

  addToCard(product: UpsaleProductDto, condition: ConditionalPrice) {
    if (!this.currentGuestOrder.orderProducts) {
      this.currentGuestOrder.orderProducts = [];
    }
    const orderProduct = new OrderProduct();
    orderProduct.productQty = 1;
    orderProduct.productCategoryId = this.selectedCategory.categoryId;
    orderProduct.productId = product.productId;
    orderProduct.productCondition = condition.condition;
    orderProduct.productTitle = product.productTitle;
    orderProduct.productUnitPrice = condition.conditionalPrice;
    orderProduct.productTotalPrice = new Amount();
    orderProduct.productTotalPrice.amount = orderProduct.productQty * orderProduct.productUnitPrice.amount;
    orderProduct.productTotalPrice.currency = orderProduct.productUnitPrice.currency;
    this.currentGuestOrder.orderTotalAmount.amount += orderProduct.productTotalPrice.amount;
    this.currentGuestOrder.orderProducts.push(orderProduct);

    localStorage.setItem("basket",JSON.stringify(this.currentGuestOrder));
  }

  openBasket() {
    this.router.navigate(['/guest/' + this.bookingId  + '/basket']).then();
  }

}
