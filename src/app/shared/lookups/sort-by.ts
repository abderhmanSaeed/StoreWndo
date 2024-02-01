import { SortByEnum } from "../enums/sort-by/sort-by";
import { SortBy } from "../models/sort-by/sort-by";

export const sortByList: SortBy[] = [
    {
        id: SortByEnum.RecentlyAdded,
        label: 'shared.recently-added'
    },
    {
        id: SortByEnum.PriceLowToHigh,
        label: 'shared.low-to-high'
    },
    {
        id: SortByEnum.PriceHighToLow,
        label: 'shared.high-to-low'
    },
    {
        id: SortByEnum.Offers,
        label: 'shared.offers'
    },
]