import { ActionTypes } from 'src/app/shared/enums/action-types/action-types';

export const DynamicHeaderMobileMenuConfig = {
  items: [
    {
      page: '/explore',
      title: 'explore',
      className: 'explore',
      actionType: ActionTypes.Link,
      imgPath: './assets/media/svg/discovery-2.svg',
    },
    {
      page: '/cart',
      title: 'cart',
      className: 'cart',
      actionType: ActionTypes.Link,
      imgPath: './assets/media/svg/cart-2.svg',
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
      imgPath: './assets/media/svg/love-2.svg',
    },
    {
      page: '/notifications',
      title: 'notification',
      className: 'notification',
      actionType: ActionTypes.Link,
      imgPath: './assets/media/svg/noti.svg',
    },
  ],
};
