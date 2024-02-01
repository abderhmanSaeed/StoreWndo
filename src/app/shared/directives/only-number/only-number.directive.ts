import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[onlyNumber]'
})
export class OnlyNumberDirective {

  constructor(private _elRef: ElementRef, private _Renderer2: Renderer2) { }
  ngOnInit() {
    this._Renderer2.setAttribute(this._elRef.nativeElement, 'onkeypress', 'return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 0  || event.charCode == 46');
  }
}
