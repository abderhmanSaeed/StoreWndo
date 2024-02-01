import { DeliveryMethods } from "../../enums/delivery-methods/delivery-methods";
import { Address } from "../address/address";

export interface Order {
    pickUpTime?: number,
    paymentMethod?: number;
    addressId?: number | undefined,
    address?: Address | undefined,
    deliveryMethod?: DeliveryMethods,
    isNeededMultiplePayment?: boolean
}
