import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'auk-select',
  templateUrl: './auk-select.component.html',
  styleUrls: ['./auk-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AukSelectComponent,
      multi: true,
    },
  ],
})
export class AukSelectComponent implements ControlValueAccessor, OnInit {

  // begin:: inputs props 
  @Input() items!: any
  @Input() label: string = ''
  @Input() panelclass: string = '';
  @Input() id: number = Math.random();
  @Input() loading: boolean = false;
  @Input() bindLabel: string = 'name'
  @Input() bindValue: string = 'id'
  @Input() static: boolean = false;
  @Input() wndoStyle: boolean = false;
  @Input() clearable: boolean = false;
  @Input() labelPanelclass: string = '';
  @Input() placeholder: string = 'Select'
  @Input() showValidations: boolean = true;
  @Input() control: FormControl | undefined;
  @Input() selectedValue: any | undefined = null;

  
  
  // Outputs
  @Output() onChange: EventEmitter<any> = new EventEmitter();


  // boooleans 
  touched = false;
  disabled = false;

  // porops 
   validatorEnum = Validators;

  // funcs 
  private onChange_ = (value: string) => {};
  private onTouched = () => {};



  constructor() { }

  ngOnInit(): void {
  }


  writeValue(obj: any): void {
    this.selectedValue = obj;
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

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  onSelectChange(e: any) {
    this.onChange_(this.selectedValue);
    this.onChange.emit(this.selectedValue)
  }
}
