import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Constant } from 'src/app/core/config/constant';
import { AccountSettings } from 'src/app/modules/buyer-profile/models/account-settings/account-settings';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { City } from 'src/app/shared/models/city/city';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';

@Component({
  selector: 'toggler-settings',
  templateUrl: './toggler-settings.component.html',
  styleUrls: ['./toggler-settings.component.scss']
})
export class TogglerSettingsComponent implements OnInit {


// Inputs
@Input() accountSettings: AccountSettings | any | undefined = null;


// Inputs 
@Output() onChange: EventEmitter<any> = new EventEmitter();


// Props 
languagesEnum = Languages;
lang: Languages = Languages.AR;



  constructor(
    private _BrowserService: BrowserService,
  ) { }

  ngOnInit(): void {
    this.lang = this._BrowserService.getItem(Constant.locale);
  }


  onToggleChange({checked}: MatSlideToggleChange, prop: string, zereOne: boolean = false): void {
    console.log(this.accountSettings);
    
    if(prop == 'language') {
      this.accountSettings = {
        ...this.accountSettings,
        language: this.lang == Languages.AR ? Number(true) : Number(false),
      }
      console.log(this.accountSettings.language);
       
      this.onChange.emit(this.accountSettings)
      return
    }

    this.accountSettings = {
      ...this.accountSettings,
      [prop]: zereOne ? Number(checked) : checked
    }
    this.onChange.emit(this.accountSettings)
  }
}
