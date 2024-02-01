import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Subscription } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ComponentBase } from 'src/app/shared/helpers/component-base.directive';
import { ShortsService } from '../explore/modules/shorts/services/shorts/shorts.service';
import { AuthComponents } from './enums/auth-components';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationService } from 'src/app/shared/services/localization/localization.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends ComponentBase implements OnInit, OnDestroy {


  // properties 
  countriesCode: any[] = []; 
  authComponents = AuthComponents;
  subscription: Subscription = new Subscription();
  currentAuth: AuthComponents = AuthComponents.Login;


  // booleans 
  isForget: boolean = false;

  constructor(
    private _HttpService: HttpService,
    TranslateService: TranslateService,
    private _ShortsService: ShortsService,
    LocalizationService: LocalizationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    super( LocalizationService, TranslateService );
    this.initAuthComponet(data);
  }

  ngOnInit(): void {
    this.getCountriesCode();
    this.pauseVideo();
  }


  pauseVideo() {
    this._ShortsService.shouldPauseVideo$.next(true);
  }


  

  override ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  initAuthComponet(data: any): void {
    if (data?.authComponent) {
      this.currentAuth = data?.authComponent;
    }
  }


  getCountriesCode(): void {
    this.subscription.add( this._HttpService.get(APIs.getCountriesCode)
    .pipe( map( data => data.responseData ) ).subscribe(data => this.countriesCode = data));
  }


  onCurrentAuthChange(event: any): void {  
    
    switch (event.AuthComponent) {
      case AuthComponents.VerifyCode:      
        if (event.isForget) {
          this.isForget = true;          
        } else {
          this.isForget = false;
        }      

        this.currentAuth = AuthComponents.VerifyCode
        break;
    
      default:
        this.currentAuth = event
        break;
    }

  }

}
