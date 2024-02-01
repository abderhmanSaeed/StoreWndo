import { OrderItem } from "../order-item/order-item";

export interface Order {
   orderNumber?: number,
   orderState?: number,
   price?: number,
   noOfItems?: number,
   createdAt?: string,
   canBeRefunded?: boolean,
   isCancel?: boolean,
   items?: OrderItem[]
}
