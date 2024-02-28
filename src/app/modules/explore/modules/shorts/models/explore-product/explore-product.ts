export interface ExploreProduct {
    id?: string,
    name?: string,
    category?: ProducCategory,
    section?: ProducSection,
    subCategory?: ProducSubCategory,
    seller?: Seller,
    image?: ProductImage,
    video?: ProductVideo,
    priceAfterOffer?: number,
    price?: number,
    discount?: number,
    rate?: number,
    commentsCount?: number,
    likes?: number,
    isFollowed?: boolean,
    isMine?: boolean,
    isLiked?: boolean,
    isInCart?: boolean,
    isOutOfStock?: boolean;
    isInWishList?: boolean,
    followersCount?: number,
    flashSales?: FlashSale[],
    wishListData: WishListData,
    shareCount?: number
}


export interface WishListData {
    isInWishList: boolean,
    wishListCount: number
}

export interface ProducCategory {
    id: number,
    name: string
}


interface ProducSubCategory {
    id: number,
    name: string
}


interface ProducSection {
    id: number,
    name: string
}


export interface Seller {
    id?: string,
    userName?: string,
    name?: string,
    email?: string,
    imagePath?: string,
    isRemoved?: boolean,
    image?: string,
    items?: number,
    rate?: number;
    isFollowed?: boolean,
    followersCount?: number,
    isFollowing?: boolean,
    picture?: string,
    userId?: string,
    isFollow?: boolean,
    numberOfItems?: number
}


export interface FlashSale {
    id?: string,
    name?: string,
    image?: ProductImage,
    priceAfterOffer?: number,
    price?: number,
    isMine?: boolean,
    isInCart?: boolean,
    isInWishList?: boolean
}


export interface ProductImage {
    id: number,
    imageId: string,
    urlThumbnail: string,
    urlPreview: string,
    urlDownload: string
}


export interface ProductVideo {
    id: number,
    videoId: string,
    urlThumbnail: string,
    urlPreview: string,
    urlDownload: string,
    isMain: boolean
}
