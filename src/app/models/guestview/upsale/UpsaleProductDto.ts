import {Amount} from "../Amount";
import {ConditionalPrice} from "./ConditionalPrice";

export class UpsaleProductDto {
  productId: string;
  productPictureUrl: string;
  productTitle: string;
  productDescription: string;
  fixedPrice: Amount;
  conditionalPrices: ConditionalPrice[];
}
