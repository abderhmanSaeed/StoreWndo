export interface CardCData {
    id?: string,
    name?: string,
    image?: string | any,
    rate?: number,
    isInCart?: boolean,
    isLike?: boolean,
    isInWishList?: boolean,
    isMine?: boolean,
    price?: number,
    priceAfterOffer?: number,
    offerPercentage?: number,
    description?: string,
    sellerName?: string,
    sellerImage?: string,
    sellerId?: string,
    isOutOfStock?: boolean
}
