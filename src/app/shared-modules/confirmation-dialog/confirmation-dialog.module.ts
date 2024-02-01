import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationService } from './services/confirmation/confirmation.service';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateSharedLoader } from 'src/app/core/config/translate-loaders';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    TranslateModule.forChild({
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
    ConfirmationDialogComponent
  ],
  providers: [
    ConfirmationService
  ]
})
export class ConfirmationDialogModule { }
