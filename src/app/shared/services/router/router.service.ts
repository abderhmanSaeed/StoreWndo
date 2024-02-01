import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  url: string = '';
  constructor(
      private _Router: Router,
  ) { 
   this.url = this._Router.url;
  }


  /**
  * @description Check if the router url contains the specified route
  * @param {string} route
  * @returns {boolean}
  * @memberof RouterService
  */
  hasRoute(route: string): boolean {
    return this._Router.url.includes(route);
  }


  /**
  * @description Check if the router url equal the specified route
  * @param {string} route
  * @returns {boolean}
  * @memberof RouterService
  */
  hasRelativeRoute(route: string): boolean {
    return this._Router.url === `/${route}` ? true : false;
  }


  /**
   * @description subscribe for route change
   * @returns {Observable}
   * @memberof RouterService
   */
  onRouteChange():Observable<any>{
    return this._Router.events;
  }

}