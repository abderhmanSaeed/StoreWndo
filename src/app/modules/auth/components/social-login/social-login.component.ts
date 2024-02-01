import { Component, OnInit } from '@angular/core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { LoginProviders } from '../../enums/login-providers';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialAuthService } from "angularx-social-login";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Subscription, switchMap } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { APIs } from 'src/app/core/config/apis';
import { Constant } from 'src/app/core/config/constant';
import { HResponse } from 'src/app/shared/models/http-response/http-response';
import { AuthComponent } from '../../auth.component';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit {

  brands: any[] = [
    {
      name: 'Google',
      svg: 'assets/media/svg/brands/google.svg'
    },
    {
      name: 'Facebook',
      icon: faFacebookF,
      color: '#005DAB'
    },
  ]
  subscription: Subscription = new Subscription();

  constructor(
    private _AuthService: AuthService,
    private _HttpService: HttpService,
    private _BrowserService: BrowserService,
    public _AngularFireAuth: AngularFireAuth,
    private _MessagesService: MessagesService,
    private _TranslateService: TranslateService,
    private _SocialAuthService: SocialAuthService,
    private _AuthDialogRef: MatDialogRef<AuthComponent>,
  ) { }


  ngOnInit(): void {
  }


  signInWith(item: any): void {
    console.log(item, 'signInWith');
    switch (item?.name) {
      case LoginProviders.Google:
        console.log('######');
        
        this.signInWithGoogle();  
      break;

      case LoginProviders.Facebook:
        this.signInWithFB();  
      break;
    
      default:
        break;
    }
  }



  signInWithGoogle(): void {
    this._AngularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((res: any) => {
      const profile = res?.additionalUserInfo.profile;
      const paload = {
        email: profile?.email,
        providerName: 'google',
        providerId: profile?.id,
      }
      this.login(paload);
    });
  }


  signInWithFB(): void {
    this._SocialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then( res => {
      const profile = res;
      const paload = {
        email: profile?.email,
        providerName: 'facebook',
        providerId: profile?.id,
      }
      this.login(paload);
    }).catch( error => {
      console.error(error, 'facebook error');
    });
  }




  login(payload: object): void {
    this.subscription.add(this._HttpService.post(APIs.externalLogin, payload)
    .pipe(
      switchMap((res: HResponse) => {
        const loginPayload = {
          ...res.responseData,
          email: res.responseData.userName
        }
        return this._HttpService.post(APIs.login, loginPayload);
      })
    )
    .subscribe((res: HResponse ) => {      
      if (!res.isSuccess) return;

      this._BrowserService.setItem(Constant.userData,res.responseData);
      if (res.responseData.access_Token) {
        this._BrowserService.setItem(Constant.token,res.responseData.access_Token);
        this._AuthService.authChange$.next(res.responseData);
      }
      if (!res.responseData.isVerified) {

      } else {
        this._BrowserService.setItem(Constant.explorePages, []);
        this._AuthDialogRef.close();
        this._MessagesService.openSuccessSnackBar( 
          this._TranslateService.instant('meassges.loged-in')
        , 3000)
      }

    }));
  }


}
