import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  private isMobile = new BehaviorSubject<boolean>(false);
  public isMobile$ = this.isMobile.asObservable();

  constructor() {
    this.checkWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.checkWidth();
  }

  private checkWidth() {
    const mobileWidth = 768; // Example breakpoint for mobile devices
    const screenWidth = window.innerWidth;
    this.isMobile.next(screenWidth < mobileWidth);
  }
}