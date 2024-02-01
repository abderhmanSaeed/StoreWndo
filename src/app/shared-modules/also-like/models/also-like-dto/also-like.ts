import { Image } from "src/app/shared/models/product/image/image"

export interface RecentViewed {
   id?: string,
   name?: string,
   image?: Image,
   isInWishList?: boolean,
   isMine?: boolean,
   price?: number,
   priceAfterOffer?: number,
   offerPercentage?: number,
   description?: string,
   sellerName?: string,
   sellerImage?: string
   sellerRate?: number
}
