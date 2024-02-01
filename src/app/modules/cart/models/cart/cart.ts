import { Product } from "src/app/shared/models/product/product";

export interface Cart {
    price?: number,
    carts?: Product[],
    totalPrice?: number,
    voucherCode?: any,
    shippingFees?: number,
    voucherAmount?: number,
    expectedDeliveryAt?: string,
    isNeededMultiplePayment?: boolean,
}
