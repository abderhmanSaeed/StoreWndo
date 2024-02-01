import { Video } from "src/app/shared/models/product/video/video"
import { Image } from "src/app/shared/models/product/image/image"

export interface RecentViewed {
   id?: string,
   name?: string,
   image?: Image,
   video?: Video,
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
