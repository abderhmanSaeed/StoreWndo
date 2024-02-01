import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/app/core/services/http/http.service';
import { User } from 'src/app/modules/auth/models/user/user';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { AuthComponent } from 'src/app/modules/auth/auth.component';
import { AuthComponents } from 'src/app/modules/auth/enums/auth-components';
import { ConfirmationService } from 'src/app/shared-modules/confirmation-dialog/services/confirmation/confirmation.service';
import { ConfirmFor } from 'src/app/shared-modules/confirmation-dialog/enums/confirm-for/confirm-for';
import { Constant } from 'src/app/core/config/constant';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { BuyerProfile } from 'src/app/shared/models/buyer-profile/buyer-profile';

@Component({
  selector: 'user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit, OnDestroy {

  // Inputs 
  @Input() set buyerProfile(data: BuyerProfile | null) {
    this.ByerData = data;
    console.log(this.ByerData, 'this.ByerData');
    
  }
  @Input() lang: Languages = Languages.AR;



  // props 
  LanguagesEnum = Languages;
  authComponents = AuthComponents;
  ByerData: BuyerProfile | null = {};
  subscription: Subscription = new Subscription();
  faArrowRightFromBracket = faArrowRightFromBracket;
  navLinks: any[] = [
    {
      name: 'my-profile',
      route: '/buyer-profile/profile',
      imgPath: 'assets/media/profile/icons/profile.svg'
    },
    {
      name: 'my-orders',
      route: '/buyer-profile/orders',
      imgPath: 'assets/media/svg/orders.svg'
    },
    {
      name: 'my-wish-list',
      route: '/buyer-profile/wish-list',
      imgPath: 'assets/media/profile/icons/heart-alt.svg'
    },
    {
      name: 'setting',
      route: '/buyer-profile/setting',
      imgPath: 'assets/media/profile/icons/menu.svg'
    },
  ]


  constructor(
    private _Router: Router,
    private _MatDialog: MatDialog,
    public authService: AuthService,
    private _HttpService: HttpService,
    private _BrowserService: BrowserService,
    private _MessagesService: MessagesService,
    private _TranslateService: TranslateService,
    private _ConfirmationService: ConfirmationService,
  ) { }

   

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }


  logout(): void {
    this.subscription.add(this._HttpService.post(APIs.logout).subscribe((res: HResponse ) => {
      this._BrowserService.deleteItem(Constant.token);
      this._BrowserService.deleteItem(Constant.userData);
      this.authService.authChange$.next(null);
      this._BrowserService.setItem(Constant.explorePages, []);
      this._MessagesService.openSuccessSnackBar(
        this._TranslateService.instant('meassges.loged-out')
      , 3000)
      this._Router.navigate(['/explore'])
    }));
  }


  openLogoutConfirmationDialog(): void {
   this.subscription.add( this._ConfirmationService.openConfirmationDialog(ConfirmFor.Logout)
    .subscribe((confirmed) => {
      if (confirmed == ConfirmFor.Logout) {
        this.logout();
      }
    }));
  }


  openAuthDialog(authComponent: AuthComponents): void {
    this._MatDialog.open(AuthComponent, {
      width: '550px',
      panelClass: 'auth-dialog',
      direction: this.lang ==  this.LanguagesEnum.EN ? 'ltr' : 'rtl',
      data: {
        authComponent
      }
    });
  }


  onImgError(event: any){
    event.target.src = 'assets/media/users/user-placeholder.png'
  }


}
