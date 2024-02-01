import { PickUpTime } from "../enums/pick-up-time/pick-up-time";
import { ShippingTime } from "../models/shipping-time/shipping-time";

export const shippingTimes: ShippingTime[] = [
    {
        id: PickUpTime.Any,
        label: 'checkout.any-time'
    },
    {
        id: PickUpTime.Morning9am12pm,
        label: 'checkout.morning-9-am-2-pm'
    },
    {
        id: PickUpTime.Evening12pm4pm,
        label: 'checkout.evening-2-pm-8-pm'
    }
]