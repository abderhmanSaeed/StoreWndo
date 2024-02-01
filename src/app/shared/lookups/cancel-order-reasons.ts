import { CancelationReason } from "../enums/cancellation-reason/cancelation-reason";
import { CancelReason } from "../models/cancel-reason/cancel-reason";

export const cancelOrderRasons: CancelReason[] = [
    {
        id: CancelationReason.DeliveryDateChanged,
        label: 'cancelation-reason.expected-delivery-date-has-changed'
    },
    {
        id: CancelationReason.ProductNotRequiredAnymore,
        label: 'cancelation-reason.product-is-not-required-anymore'
    },
    {
        id: CancelationReason.ProductNotRequiredAnymore,
        label: 'cancelation-reason.bad-review-from-relatives-ordering-product'
    },
    {
        id: CancelationReason.Other,
        label: 'cancelation-reason.other'
    }
]