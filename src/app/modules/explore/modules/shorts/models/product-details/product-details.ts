import { User } from "src/app/modules/auth/models/user/user"
import { ExploreProduct, ProducCategory, ProductImage, ProductVideo, Seller } from "../explore-product/explore-product"
import { Section } from "../../../../../../shared/models/section/section"

export interface ProductDetails {
    id?: string,
    name?: string,
    description?: string,
    category?: ProducCategory,
    subCategory?: ProducCategory
    section?: Section,
    seller?: Seller,
    isMine?: boolean,
    rate?: number,
    reviewCount?: number,
    likesCount?: number,
    images?: ProductImage[],
    videos?: ProductVideo[],
    price?: Price,
    isInCart?: boolean,
    deliveryMethod?: any,
    isLike?: boolean,
    isInWishList?: boolean,
    lookups?: Lookup[],
    commentsCount?: number,
    comments?: Comment[],
    sameProducts?: ExploreProduct[],
    colorWithSizes?: ColorWithSizes[],
    sizes?: Size[],
    isInReview?: boolean,
    quantity?: number
}


export interface ColorWithSizes {
    color?: Color,
    sizes?: Size[]
};


export interface Size {
    id?: number,
    name?: string,
    quantity?: number
};


export interface Color {
    id?: number,
    name?: string,
    hexaCode?: string,
    quantity?: number
};


export interface Price {
    price?: number,
    discount?: number,
    isPermanent?: boolean,
    expiryDate?: string,
    priceAfterOffer?: number,
    wndoCommission?: number,
    shippingFees?: number,
    taxes?: number
};



export interface Lookup {
    id?: number,
    displayName?: string,
    isMultiChoice?: boolean,
    lookupValues?: [
      {
        id?: number,
        displayName?: string,
        isSelected?: boolean
      }
    ]
}

export interface Comment  {
    id?: number,
    user?: User,
    productId?: string,
    message?: string,
    likes?: number,
    isLike?: boolean,
    creationTime?: string,
    isReported?: boolean,
    commentReplies?: Comment[],
    isMine?: boolean
}