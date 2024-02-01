import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/core/config/constant';
import { Language } from 'src/app/layout/models/language/language';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { LocalizationService } from 'src/app/shared/services/localization/localization.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss']
})
export class ChangeLanguageComponent implements OnInit {


  languageEnu = Languages;
  languages: Language[] = [
    {
      imgPath: 'assets/media/flags/ar.svg',
      name: 'arabic',
      key: Languages.AR
    },
    {
      imgPath: 'assets/media/flags/en.svg',
      name: 'english',
      key: Languages.EN
    },
  ];

  selectedLanguage: Language | null = null;

  constructor(
    private _BrowserService: BrowserService,
    private _NgxSpinnerService: NgxSpinnerService,
    private _LocalizationService: LocalizationService,
  ) { }

  ngOnInit(): void {
    this.getSelectedLanguage();
  }


  getSelectedLanguage(): void {
    let lang = this.languages.filter( lang => lang.key ==  this._BrowserService.getItem(Constant.locale))[0]
    this.selectedLanguage =  lang ? lang : this.languages[0];
  }
  

  onLangChange( lang: Language): void {
    this._NgxSpinnerService.show();
    this.selectedLanguage = lang;
    this._BrowserService.setItem(Constant.locale,lang.key)
    window.location.reload();
  }


}
