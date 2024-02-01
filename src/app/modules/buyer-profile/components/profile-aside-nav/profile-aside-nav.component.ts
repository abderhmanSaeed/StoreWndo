import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'profile-aside-nav',
  templateUrl: './profile-aside-nav.component.html',
  styleUrls: ['./profile-aside-nav.component.scss']
})
export class ProfileAsideNavComponent implements OnInit {

  // props 
  mainRippleColor: string = environment.mainRippleColor
  navItems: any[] = [
    {
      name: 'buyer-profile.sidemenu.my-profile',
      route: '/buyer-profile/profile',
      iconPath: 'assets/media/profile/icons/profile.svg',
      activeIconPath: 'assets/media/profile/icons/profile-white.svg',
      iconWidth: 14
    },
    {
      name: 'buyer-profile.sidemenu.my-orders',
      route: '/buyer-profile/orders',
      iconPath: 'assets/media/svg/cart.svg',
      activeIconPath: 'assets/media/svg/cart-white.svg',
      iconWidth: 14
    },
    {
      name: 'buyer-profile.sidemenu.my-wallet',
      route: '/buyer-profile/wallet',
      iconPath: 'assets/media/profile/icons/profile.svg',
      activeIconPath: 'assets/media/profile/icons/profile-white.svg',
      iconWidth: 14
    },
    {
      name: 'buyer-profile.sidemenu.my-addresses',
      route: '/buyer-profile/addresses',
      iconPath: 'assets/media/profile/icons/pin.svg',
      activeIconPath: 'assets/media/profile/icons/pin-white.svg',
      iconWidth: 14
    },
    {
      name: 'buyer-profile.sidemenu.my-wishList',
      route: '/buyer-profile/wish-list',
      iconPath: 'assets/media/profile/icons/heart-alt.svg',
      activeIconPath: 'assets/media/profile/icons/heart-alt-white.svg',
      iconWidth: 14
    },
    {
      name: 'buyer-profile.sidemenu.payment-methods',
      route: '/buyer-profile/payment-methods',
      iconPath: 'assets/media/profile/icons/payment.svg',
      activeIconPath: 'assets/media/profile/icons/payment-white.svg',
      iconWidth: 14
    },
    {
      name: 'buyer-profile.sidemenu.settings',
      route: '/buyer-profile/setting',
      iconPath: 'assets/media/profile/icons/menu.svg',
      activeIconPath: 'assets/media/profile/icons/menu-white.svg',
      iconWidth: 14
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
