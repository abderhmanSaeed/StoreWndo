import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FieldComponent,
      multi: true,
    },
  ],
})
export class FieldComponent implements ControlValueAccessor, OnInit {

  
  @Input() label: string = ''
  @Input() value: any = null;
  @Input() type: string = 'text'
  @Input() panelclass: string = ''
  @Input() placeholder: string = ''
  @Input() readonly: boolean = false;
  @Input() labelPanelclass: string = ''
  @Input() id: number = Math.random();
  @Input() showPasswordBtnClass: string = ''
  @Input() showValidations: boolean = true;
  @Input() control: FormControl | undefined;

  faEye = faEye;
  touched = false;
  faEyeSlash = faEyeSlash;
  validatorEnum = Validators;
  showPassword: boolean = false;


  // funcs 
  private onChange_ = (value: string) => {};
  private onTouched = () => {};

  constructor() { }

  ngOnInit(): void {
  }


  writeValue(obj: any): void {
    this.value = obj;
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

  onInput(): void {
    this.onChange_(this.value);
  }

}
