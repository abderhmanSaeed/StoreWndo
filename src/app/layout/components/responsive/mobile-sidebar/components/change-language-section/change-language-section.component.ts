import { Component, Input, OnInit } from '@angular/core';
import { Language } from 'src/app/layout/models/language/language';
import { Languages } from 'src/app/shared/enums/languages/languages';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalizationService } from 'src/app/shared/services/localization/localization.service';
import { Constant } from 'src/app/core/config/constant';

// @Component({
//   selector: 'app-change-language-section',
//   templateUrl: './change-language-section.component.html',
//   styleUrls: ['./change-language-section.component.scss']
// })
// export class ChangeLanguageSectionComponent implements OnInit {
//   defaultLanguage: Languages = Languages.EN;



//   selectedLanguage: Language | null = null;

//   constructor(  private _BrowserService: BrowserService,
//     private _NgxSpinnerService: NgxSpinnerService,
//     private _LocalizationService: LocalizationService,) { }

//     ngOnInit(): void {
//       this.getSelectedLanguage();
//     }

//     getSelectedLanguage(): void {
//       let lang =  this._BrowserService.getItem(Constant.locale)
//       this.selectedLanguage = lang ? lang : this.defaultLanguage ;
//     }

//   onLangChange( lang: Language): void {
//     this._NgxSpinnerService.show();
//     this.selectedLanguage = lang;
//     this._BrowserService.setItem(Constant.locale,lang.key)
//     window.location.reload();
//   }

// }

// import { Component, OnInit } from '@angular/core';
// import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { LocalizationService } from 'src/app/shared/services/localization/localization.service';
// import { Constant } from 'src/app/core/config/constant';
// import { Languages } from 'src/app/shared/enums/languages/languages';

@Component({
  selector: 'app-change-language-section',
  templateUrl: './change-language-section.component.html',
  styleUrls: ['./change-language-section.component.scss']
})
export class ChangeLanguageSectionComponent implements OnInit {
  // defaultLanguage: Languages = Languages.EN; // Adjust based on your enum
  // selectedLanguage: string = "";

  // constructor(
  //   private browserService: BrowserService,
  //   private ngxSpinnerService: NgxSpinnerService,
  //   private localizationService: LocalizationService
  // ) {}

  // ngOnInit(): void {
  //   this.getSelectedLanguage();
  // }

  // getSelectedLanguage(): void {
  //   const lang = this.browserService.getItem(Constant.locale);
  //   this.selectedLanguage = lang ? lang : this.defaultLanguage;
  // }

  // onLangChange(lang: string): void {
  //   this.ngxSpinnerService.show();

  //   // Directly set the new language
  //   this.selectedLanguage = lang;

  //   // Update the language in browser storage
  //   this.browserService.setItem(Constant.locale, lang);

  //   // Consider using a service to change the language without reloading the page
  //   window.location.reload();
  // }

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
