import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent {

  @Input() control: FormControl | undefined;
  get keysOfErrors() {    
    if (this.control?.errors) return Object.keys(this.control?.errors as []);
    return [];
  }
}
