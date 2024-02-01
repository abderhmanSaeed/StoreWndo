import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { PlayBtnComponent } from './components/play-btn/play-btn.component';
import { AukSlideToggleComponent } from './components/auk-slide-toggle/auk-slide-toggle.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioBtnComponent } from './components/radio-btn/radio-btn.component';
import { FieldComponent } from './components/field/field.component';
import { ButtonComponent } from './components/button/button.component';
import { IntlTelInputComponent } from './components/intl-tel-input/intl-tel-input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatCardModule } from '@angular/material/card';
import { AukSelectComponent } from './components/auk-select/auk-select.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PipesModule } from './pipes/pipes.module';
import { ValidationComponent } from './components/validation/validation.component';
import { RippleLoaderComponent } from './components/ripple-loader/ripple-loader.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { MatRippleModule } from '@angular/material/core';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ConfirmationDialogModule } from '../shared-modules/confirmation-dialog/confirmation-dialog.module';
import { WndoLoaderComponent } from './components/wndo-loader/wndo-loader.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { DirectivesModule } from './directives/directives.module';
import { createTranslateSharedLoader } from '../core/config/translate-loaders';
import {
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AukPlayIconComponent } from './components/auk-play-icon/auk-play-icon.component';
import { ResponsiveUCComponent } from './components/responsive-uc/responsive-uc.component';
import { NgPipesModule } from 'ngx-pipes';




@NgModule({
  declarations: [
    FieldComponent,
    ButtonComponent,
    SpinnerComponent,
    NoDataComponent,
    PlayBtnComponent,
    RadioBtnComponent,
    TextareaComponent,
    DropdownComponent,
    AukSelectComponent,
    BreadcrumbComponent,
    ValidationComponent,
    WndoLoaderComponent,
    IntlTelInputComponent,
    RippleLoaderComponent,
    AukSlideToggleComponent,
    AukPlayIconComponent,
    ResponsiveUCComponent,
  ],
  imports: [
    NgbModule,
    PipesModule,
    FormsModule,
    RouterModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    NgPipesModule,
    NgSelectModule,
    MatRippleModule,
    MatButtonModule,
    DirectivesModule,
    FontAwesomeModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    ConfirmationDialogModule,
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
    NgbModule,
    PipesModule,
    MatCardModule,
    MatIconModule,
    NgPipesModule,
    FieldComponent,
    TranslateModule,
    ButtonComponent,
    MatButtonModule,
    MatRippleModule,
    NoDataComponent,
    PlayBtnComponent,
    SpinnerComponent,
    TextareaComponent,
    DirectivesModule,
    RadioBtnComponent,
    DropdownComponent,
    FontAwesomeModule,
    AukSelectComponent,
    WndoLoaderComponent,
    BreadcrumbComponent,
    AukPlayIconComponent,
    RippleLoaderComponent,
    IntlTelInputComponent,
    AukSlideToggleComponent,
    ConfirmationDialogModule,
  ],
})
export class SharedModule { }
