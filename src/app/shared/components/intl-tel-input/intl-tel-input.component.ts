import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Languages } from '../../enums/languages/languages';

@Component({
  selector: 'intl-tel-input',
  templateUrl: './intl-tel-input.component.html',
  styleUrls: ['./intl-tel-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: IntlTelInputComponent,
      multi: true,
    },
  ],
})
export class IntlTelInputComponent implements ControlValueAccessor, OnInit {

  @Input() id: string = ''
  @Input() label: string = ''
  @Input() type: string = 'number'
  @Input() panelclass: string = ''
  @Input() placeholder: string = ''
  @Input() countriesCodes: any[] = []
  @Input() isMatrial: boolean = false;
  @Input() showValidations: boolean = true;
  @Input() control: FormControl | undefined;
  @Input() set initValue(value: any) {
    this.value = value;
  };


  @Output() onChange: EventEmitter<any> = new EventEmitter();

  
  value: any = null;
  selectedCode = '+20';
  LanguagesEnum = Languages;
  validatorEnum = Validators;
  subscription: Subscription = new Subscription();
  lang: Languages = (this._TranslateService.currentLang as Languages);

  // boooleans 
  touched = false;
  disabled = false;

  // funcs 
  private onChange_ = (value: any) => {};
  private onTouched = () => {};

  constructor(
    private _TranslateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.emitValue();
    this.onLangChange();
  }

  onLangChange(): void {
    this.subscription.add( this._TranslateService.onLangChange.subscribe(({lang}: any) => {
      this.lang = (lang as Languages);
    }));
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }


  writeValue(obj: any): void {
    this.value = obj
  }

  registerOnChange(onChange: any): void {
    this.onChange_ = onChange;    
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  emitValue(): void {

    let validNumber =  parseInt(this.value, 10)+'';

    this.onChange.emit(
      {
        code: this.selectedCode,
        phone: validNumber
      }
    )

    this.onChange_({
        code: this.selectedCode,
        phone: validNumber
    });

  }

}
