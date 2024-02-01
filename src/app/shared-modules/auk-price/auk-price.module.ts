import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AukPriceComponent } from './auk-price.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateSharedLoader } from 'src/app/core/config/translate-loaders';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    AukPriceComponent
  ],
  imports: [
    CommonModule,
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
    AukPriceComponent
  ]
})
export class AukPriceModule { }
