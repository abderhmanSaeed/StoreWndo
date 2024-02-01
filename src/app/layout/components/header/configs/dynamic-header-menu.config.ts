import { ActionTypes } from "src/app/shared/enums/action-types/action-types";

export const DynamicHeaderMenuConfig = {
    items: [
        {
            page: '',  
            title: 'sell',
            className: 'sell',
            actionType: ActionTypes.Button,
            imgPath: './assets/media/svg/sell.svg',    
            imgPathRTL: './assets/media/svg/sell-rtl.svg',    
        },
        {
            page: '/cart',  
            title: 'cart',
            className: 'cart',
            actionType: ActionTypes.Link,
            imgPath: './assets/media/svg/cart.svg',    
        },
        {
            page: '/buyer-profile/wallet',  
            title: 'wallet',
            className: 'purse',
            actionType: ActionTypes.Link,
            imgPath: './assets/media/svg/purse.svg',    
        },
        {
            page: '/buyer-profile/wish-list',  
            className: 'fav',
            title: 'favorites',
            actionType: ActionTypes.Link,
            imgPath: './assets/media/svg/love.svg',    
        },
        {
            page: '/notifications',  
            title: 'notification',
            className: 'notification',
            actionType: ActionTypes.Link,
            imgPath: './assets/media/svg/noti.svg',    
        }
    ]
}