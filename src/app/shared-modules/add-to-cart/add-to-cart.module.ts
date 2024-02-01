import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToCartComponent } from './add-to-cart.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthModule } from 'src/app/modules/auth/auth.module';
import { ProductFeaturesModule } from '../product-features/product-features.module';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateSharedLoader } from 'src/app/core/config/translate-loaders';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    AddToCartComponent
  ],
  imports: [
    AuthModule,
    CommonModule,
    RouterModule,
    MatButtonModule,
    ProductFeaturesModule,
    TranslateModule.forRoot({
      defaultLanguage: environment.defaultLanguage,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateSharedLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
  exports: [
    AddToCartComponent,
  ]
})
export class AddToCartModule { }
