import { PaymentMethods } from "../../enums/payment-methods/payment-methods";

export interface PaymentMethod {
    id?: PaymentMethods,
    name?: string,
    checked?: boolean,
    value?: string,
    label: string,
    sublabel?: string,
    iconPath?: string,
    activeIconPath?: string,
    width?: number
}
