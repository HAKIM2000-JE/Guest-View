import {Amount} from "../Amount";

export class OrderProduct {
  productId: string;
  productCategoryId: string;
  productUnitPrice: Amount;
  productQty: number;
  productCondition: string;
  productTotalPrice: Amount;
  createdDate: string;
  productState: string;
  productTitle: string;
}
