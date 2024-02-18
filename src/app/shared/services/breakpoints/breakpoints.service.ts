import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class BreakpointsService {
  isBpMax1400px: boolean = false;
  isBpMax1200px: boolean = false;
  constructor(
    public _BreakpointObserver: BreakpointObserver
  ) {
    this.isBpMax1400px = this._BreakpointObserver.isMatched('(max-width: 1399.98px)');
    this.isBpMax1200px = this._BreakpointObserver.isMatched('(max-width: 1199.98px)');
   }



  /**
    * @description detect whether the website is being opened in a mobile device or a desktop
    * @returns boolean
    */
  isMobileDevice(): boolean {
    /* Storing user's device details in a variable*/
    let details = navigator.userAgent;

    /* Creating a regular expression
    containing some mobile devices keywords
    to search it in details string*/
    let regexp = /android|iphone|kindle|ipad/i;

    /* Using test() method to search regexp in details
    it returns boolean value*/
    let isMobileDevice = regexp.test(details);

    if (isMobileDevice) {
      return true
    } else {
      return false
    }
  }
}
