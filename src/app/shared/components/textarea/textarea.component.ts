import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextareaComponent,
      multi: true,
    },
  ],
})
export class TextareaComponent implements ControlValueAccessor, OnInit {

  // inputs 
  @Input() label: string = ''
  @Input() rows: string = '3'
  @Input() value: any = null;
  @Input() type: string = 'text'
  @Input() panelclass: string = ''
  @Input() placeholder: string = ''
  @Input() id: number = Math.random();
  @Input() showValidations: boolean = true;
  @Input() control: FormControl | undefined;


  // props 
  validatorEnum = Validators;


  // booleans
  touched = false;


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
