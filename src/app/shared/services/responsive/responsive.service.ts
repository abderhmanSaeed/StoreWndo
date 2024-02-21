import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Constant } from 'src/app/core/config/constant';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  private defaultMobileWidth = Constant.laptopWidth;; // Default breakpoint
  private overrideMobileWidth: number | null = null;
  private isMobile = new BehaviorSubject<boolean>(false);
  public isMobile$ = this.isMobile.asObservable();

  constructor() {
    this.checkWidth();
    this.onResize();
  }

  private checkWidth() {
    const screenWidth = window.innerWidth;
    const breakpoint = this.overrideMobileWidth ?? this.defaultMobileWidth;
    this.isMobile.next(screenWidth <= breakpoint);
  }

  public onResize() {
    window.addEventListener('resize', () => this.checkWidth());
  }

  public updateDefaultMobileWidth(newWidth: number) {
    this.defaultMobileWidth = newWidth;
    this.checkWidth();
  }

  public overrideBreakpoint(newWidth: number) {
    this.overrideMobileWidth = newWidth;
    this.checkWidth();
  }

  public clearOverride() {
    this.overrideMobileWidth = null;
    this.checkWidth();
  }
}
