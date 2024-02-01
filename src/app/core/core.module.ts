import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from './interceptors/auth-interceptor/auth.interceptor';
import { ErrorHandlerInterceptor } from './interceptors/error-interceptor/error.interceptor';
import { LoaderInterceptor } from './interceptors/loader-interceptor/loader.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthModule } from "src/app/modules/auth/auth.module";

@NgModule({
  declarations: [],
  imports: [
    AuthModule,
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers : [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ]
})
export class CoreModule { }
