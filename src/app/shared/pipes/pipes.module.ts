import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetControlPipe } from './get-control/get-control.pipe';
import { ShortNumbersPipe } from './short-numbers/short-numbers.pipe';
import { FilterPipe } from './filter/filter.pipe';


const pipes = [
  FilterPipe,
  GetControlPipe,
  ShortNumbersPipe
]


@NgModule({
  declarations: [
    ...pipes
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterPipe,
    GetControlPipe,
    ShortNumbersPipe
  ]
})
export class PipesModule { }
