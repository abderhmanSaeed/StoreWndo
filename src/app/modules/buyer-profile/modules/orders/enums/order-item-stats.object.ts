import { OrderItemState } from "src/app/shared/enums/order-item-state/order-item-state";

export const OrderItemStatsObject = {
    ordered: {
        key: OrderItemState.OrderPlaced,
        label: 'my-orders.ordered',
        color: '#4EA3F8',
    },
    shipping: {
        key: OrderItemState.Shipping,
        label: 'my-orders.shipping',
        color: '#fca908',

    },
    delivered: {
        key: OrderItemState.Delivered,
        label: 'my-orders.delivered',
        color: '#02A207',

    },
    returned: {
        key: OrderItemState.Returned,
        label: 'my-orders.returned',
        color: '#F4D014',

    },
    cancelled: {
        key: OrderItemState.Canceled,
        label: 'my-orders.cancelled',
        color: '#FA0029',
    },
    refund: {
        key: OrderItemState.Refund,
        label: 'my-orders.refund',
        color: '#FA0029',
    }
}