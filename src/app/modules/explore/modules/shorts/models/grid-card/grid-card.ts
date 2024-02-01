import { Seller } from "../explore-product/explore-product";

export interface GridCard {
    price?: number,
    priceAfterOffer?: number,
    imageUrl?: string,
    productId?: string,
    seller?: Seller,
    videoUrl?: string,
    rate?: number,
    isInCart?: boolean,
    isLiked?: boolean
    isInWishList?: boolean,
    productName?: string
}
