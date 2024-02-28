import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerProfileRoutingModule } from './buyer-profile-routing.module';
import { BuyerProfileComponent } from './buyer-profile.component';
import { ProfileAsideComponent } from './components/profile-aside/profile-aside.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserMainInfoCardComponent } from './components/user-main-info-card/user-main-info-card.component';
import { BarRatingModule } from "ngx-bar-rating";
import { ProfileAsideNavComponent } from './components/profile-aside-nav/profile-aside-nav.component';
import { MatRippleModule } from '@angular/material/core';
import { ProfileTabComponent } from './components/profile-tab/profile-tab.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { PaymentMethodsComponent } from './components/payment-methods/payment-methods.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StatsComponent } from './components/stats/stats.component';
import { AddToCartModule } from 'src/app/shared-modules/add-to-cart/add-to-cart.module';
import { AddToFavModule } from 'src/app/shared-modules/add-to-fav/add-to-fav.module';
import { AukSharingModule } from 'src/app/shared-modules/auk-sharing/auk-sharing.module';
import { OwnerSmallCardModule } from 'src/app/shared-modules/owner-small-card/owner-small-card.module';
import { AddressFormModule } from 'src/app/shared-modules/address-form/address-form.module';
import { VouchersComponent } from './components/payment-methods/components/vouchers/vouchers.component';
import { MobileFormComponent } from './components/profile-tab/components/mobile-form/mobile-form.component';
import { EmailFormComponent } from './components/profile-tab/components/email-form/email-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtpValidatorModule } from 'src/app/shared-modules/otp-validator/otp-validator.module';
import { ImgPlaceholderModule } from 'src/app/shared-modules/img-placeholder/img-placeholder.module';
import { ChangePasswordComponent } from './components/settings/components/change-password/change-password.component';
import { LocationComponent } from './components/settings/components/location/location.component';
import { TogglerSettingsComponent } from './components/settings/components/toggler-settings/toggler-settings.component';
import { DeleteAccountComponent } from './components/settings/components/delete-account/delete-account.component';
import { ChangePasswordDialogComponent } from './components/settings/components/change-password-dialog/change-password-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateBuyerProfileLoader } from 'src/app/core/config/translate-loaders';
import { environment } from 'src/environments/environment';
import { WalletNavsComponent } from './components/wallet/components/wallet-navs/wallet-navs.component';
import { PaymentMethodItemComponent } from './components/payment-method-item/payment-method-item.component';
import { VouchersNavsComponent } from './components/wallet/components/vouchers-navs/vouchers-navs.component';
import { UsedVoucherComponent } from './components/wallet/components/used-voucher/used-voucher.component';
import { ActiveVoucherComponent } from './components/wallet/components/active-voucher/active-voucher.component';
import { CDCardsComponent } from './components/wallet/components/cd-cards/cd-cards.component';
import { CreditCardComponent } from './components/wallet/components/credit-card/credit-card.component';
import { TopUpComponent } from './components/wallet/components/top-up/top-up.component';
import { TransfersComponent } from './components/wallet/components/transfers/transfers.component';
import { TransferFormComponent } from './components/wallet/components/transfer-form/transfer-form.component';
import { TransferRequestDialogComponent } from './components/wallet/components/transfer-request-dialog/transfer-request-dialog.component';
import { BalanceChargedDialogComponent } from './components/wallet/components/balance-charged-dialog/balance-charged-dialog.component';
import { PaymentMethodsTabComponent } from './components/wallet/components/payment-methods-tab/payment-methods-tab.component';
import { FollowersModule } from 'src/app/shared-modules/followers/followers.module';
import { FollowingModule } from 'src/app/shared-modules/following/following.module';
import { LikesRecievedModule } from 'src/app/shared-modules/likes-recieved/likes-recieved.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    BuyerProfileComponent,
    ProfileAsideComponent,
    UserMainInfoCardComponent,
    ProfileAsideNavComponent,
    ProfileTabComponent,
    WalletComponent,
    AddressesComponent,
    WishListComponent,
    PaymentMethodsComponent,
    SettingsComponent,
    StatsComponent,
    VouchersComponent,
    MobileFormComponent,
    EmailFormComponent,
    ChangePasswordComponent,
    LocationComponent,
    TogglerSettingsComponent,
    DeleteAccountComponent,
    ChangePasswordDialogComponent,
    WalletNavsComponent,
    PaymentMethodItemComponent,
    VouchersNavsComponent,
    UsedVoucherComponent,
    ActiveVoucherComponent,
    CDCardsComponent,
    CreditCardComponent,
    TopUpComponent,
    TransfersComponent,
    TransferFormComponent,
    TransferRequestDialogComponent,
    BalanceChargedDialogComponent,
    PaymentMethodsTabComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    AddToFavModule,
    FollowersModule,
    FollowingModule,
    AddToCartModule,
    MatRippleModule,
    MatDialogModule,
    BarRatingModule,
    AukSharingModule,
    AddressFormModule,
    OtpValidatorModule,
    LikesRecievedModule,
    ImgPlaceholderModule,
    OwnerSmallCardModule,
    ReactiveFormsModule,
    BuyerProfileRoutingModule,
    MatSidenavModule,
    MatMenuModule,
    TranslateModule.forChild({
      defaultLanguage: environment.defaultLanguage,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateBuyerProfileLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],

})
export class BuyerProfileModule { }
