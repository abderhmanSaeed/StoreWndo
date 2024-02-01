import { SearchTypes } from "../enums/search-types/search-types";
import { SearchType } from "../models/search-type/search-type";

export const searchTypes: SearchType[] = [
    {
        name: 'shared.sections',
        typeId: SearchTypes.Section,
        url: '/search-results/sections'
    },
    {
        name: 'shared.category',
        typeId: SearchTypes.Category,
        url: '/search-results/categories'
    },
    {
        name: 'shared.subcategory',
        typeId: SearchTypes.Subcategory,
        url: '/search-results/products'
    },
    {
        name: 'shared.store',
        typeId: SearchTypes.Seller,
        url: '/search-results/stores'
    },
    {
        name: 'shared.products',
        typeId: SearchTypes.Product,
        url: '/search-results/products'
    }
]