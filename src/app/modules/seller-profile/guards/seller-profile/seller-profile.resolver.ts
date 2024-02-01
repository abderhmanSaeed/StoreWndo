import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { APIs } from 'src/app/core/config/apis';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HResponse } from 'src/app/shared/models/http-response/http-response';

@Injectable({
  providedIn: 'root'
})
export class SellerProfileResolver implements Resolve<boolean> {

  constructor(
    private _Router: Router,
    private _HttpService: HttpService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {    
    return this._HttpService.get(`${APIs.getSellerProfile}/${route?.params['id']}`)
    .pipe(
        map( (res: HResponse): any => {
        if (res.isSuccess) {    
          return {
            ...res,
            responseData: {
              ...res?.responseData,
              id: route?.params['id']
            }
          };
        } else {
          this._Router.navigate([`/`]);
          return null
        }
      }),
      catchError((error) => {  
        this._Router.navigate([`/`]);      
        return of();
      })
    )

  }
}
