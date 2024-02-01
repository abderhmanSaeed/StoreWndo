import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { ProcessProgressComponent } from './components/process-progress/process-progress.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ShippingPaymentComponent } from './components/shipping-payment/shipping-payment.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CartItemComponent } from './components/cart-items/cart-item.component';
import { ShippingPaymentSummaryComponent } from './components/shipping-payment-summary/shipping-payment-summary.component';
import { AddVoucherComponent } from './components/add-voucher/add-voucher.component';
import { OrderConfirmedComponent } from './components/order-confirmed/order-confirmed.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OwnerSmallCardModule } from 'src/app/shared-modules/owner-small-card/owner-small-card.module';
import { CartItemQuantityComponent } from './components/cart-items/components/cart-item-quantity/cart-item-quantity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { PaymentMethodsComponent } from './components/payment-methods/payment-methods.component';
import { AddressFormModule } from 'src/app/shared-modules/address-form/address-form.module';
import { ImgPlaceholderModule } from 'src/app/shared-modules/img-placeholder/img-placeholder.module';
import { ProductFeaturesModule } from 'src/app/shared-modules/product-features/product-features.module';
import { NameFormComponent } from './components/name-form/name-form.component';
import { PhoneFormComponent } from './components/phone-form/phone-form.component';
import { OtpValidatorModule } from 'src/app/shared-modules/otp-validator/otp-validator.module';
import { IsEmptyComponent } from './components/is-empty/is-empty.component';
import { EditAddPayShipComponent } from './components/edit-add-pay-ship/edit-add-pay-ship.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateCheckoutLoader } from 'src/app/core/config/translate-loaders';
import { environment } from 'src/environments/environment';
import { NotEnoughBalanceComponent } from './components/not-enough-balance/not-enough-balance.component';
import { HybridPaymentMethodsComponent } from './components/hybrid-payment-methods/hybrid-payment-methods.component';


@NgModule({
  declarations: [
    CartComponent,
    CheckOutComponent,
    NameFormComponent,
    CartItemComponent,
    PhoneFormComponent,
    AddVoucherComponent,
    OrderSummaryComponent,
    ConfirmationComponent,
    PaymentMethodsComponent,
    OrderConfirmedComponent,
    ProcessProgressComponent,
    ShippingPaymentComponent,
    CartItemQuantityComponent,
    ShippingPaymentSummaryComponent,
    IsEmptyComponent,
    EditAddPayShipComponent,
    NotEnoughBalanceComponent,
    HybridPaymentMethodsComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    MatDialogModule,
    AddressFormModule,
    CartRoutingModule,
    OtpValidatorModule,
    TranslateModule.forChild({
      defaultLanguage: environment.defaultLanguage,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateCheckoutLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    ReactiveFormsModule,
    ImgPlaceholderModule,
    OwnerSmallCardModule,
    ProductFeaturesModule,
  ]
})
export class CartModule { }
