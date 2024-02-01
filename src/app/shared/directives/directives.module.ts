import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './click-outside/click-outside.directive';
import { OnlyNumberDirective } from './only-number/only-number.directive';




@NgModule({
  declarations: [
    ClickOutsideDirective,
    OnlyNumberDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClickOutsideDirective,
    OnlyNumberDirective
  ]
})
export class DirectivesModule { }
