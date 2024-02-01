import { OrderStats } from "src/app/shared/enums/order-stats/order-stats";

export const OrderStatsObject = {
    ordered: {
        key: OrderStats.OrderPlaced,
        label: 'my-orders.ordered',
        color: '#4EA3F8',
    },
    shipping: {
        key: OrderStats.Shipping,
        label: 'my-orders.shipping',
        color: '#fca908',

    },
    delivered: {
        key: OrderStats.Delivered,
        label: 'my-orders.delivered',
        color: '#02A207',

    },
    returned: {
        key: OrderStats.Returned,
        label: 'my-orders.returned',
        color: '#F4D014',

    },
    refund : {
        key: OrderStats.Refund ,
        label: 'my-orders.returned',
        color: '#F4D014',

    },
    cancelled: {
        key: OrderStats.Canceled,
        label: 'my-orders.cancelled',
        color: '#FA0029',
    }
}
