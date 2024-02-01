import { RefundReasons } from "../enums/refund-reasons/refund-reasons";
import { RefundReason } from "../models/refund-reason/refund-reason";

export const refundRasons: RefundReason[] = [
    {
        id: RefundReasons.ProductDeliveredToWrongAddress,
        label: 'Product is being delivered to a wrong address.'
    },
    {
        id: RefundReasons.CheaperAlternativeAvailableWithLessPrice,
        label: 'Cheaper alternative available for lesser price.'
    },
    {
        id: RefundReasons.ProductDoesNotMatchMyExpectation,
        label: "Product doesn't match my expectation."
    },
    {
        id: RefundReasons.Other,
        label: "Other."
    }
]