import {OrderProduct} from "./OrderProduct";
import {Amount} from "../Amount";

export class GuestOrder {

  id: string;
  propertyBookingId: string;
  propertyId: string;
  propertyTitle: string;
  propertyInternalTitle: string;
  corporateId: string;
  orderNumber: string; // DateTime + propertyBookingId

  startDate: string;
  endDate: string;
  firstName: string;
  lastName: string;

  orderDate: string;
  validationDate: string;
  settlementDate: string;
  orderState: string; // INPROGRESS - VALIDATE - SETTLED

  orderProducts: OrderProduct[];
  orderTotalAmount: Amount;

}
