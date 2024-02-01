import { ProductImage, Seller } from "src/app/modules/explore/modules/shorts/models/explore-product/explore-product"
import { Category } from "./category"
import { ProSection } from "./pro-section"

export interface Product {
    isInCart?: boolean,
    id?: string;
    cartId: number,
    quantity: number,
    description: string,
    name: string,
    category: Category
    subCategory: Category
    section: ProSection
    seller: Seller,
    sellerId: string,
    image: ProductImage,
    priceAfterOffer: number,
    price: number,
    isLike: boolean,
    isInWishList: boolean,
    numOfLikes: number,
    rate: number,
    productId: string,
    sizeName: string,
    sizeId: number,
    colorHexaCode: string,
    colorName: string,
    colorId: number,
    preparationTime: number,
    discount: number,
    orderItemState?: number,
    orderItemNumber?: number,
    isRated: boolean   
}


