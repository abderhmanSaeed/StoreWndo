import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Constant } from 'src/app/core/config/constant';
import { Languages } from '../../enums/languages/languages';
import { BrowserService } from '../browser-db/browser.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  // props 
  LanguagesEnum = Languages;
  lang: Languages | null = null;
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  constructor(
    private _snackBar: MatSnackBar,
    private _BrowserService: BrowserService,
  ) { 
    this.lang = this._BrowserService.getItem(Constant.locale);
  }



  openSuccessSnackBar(message: string, duration = 3000) {
    this._snackBar.open(message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: duration,
      direction: this.lang ==  this.LanguagesEnum.EN ? 'ltr' : 'rtl',
    });
  }

  
  openErrorSnackBar(message: any, duration = 5000) {
    this._snackBar.open(message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: duration,
      panelClass: 'error',
      direction: this.lang ==  this.LanguagesEnum.EN ? 'ltr' : 'rtl'
    });
  }
}
