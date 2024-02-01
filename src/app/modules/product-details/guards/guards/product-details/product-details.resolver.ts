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
export class ProductDetailsResolver implements Resolve<boolean> {

  constructor(
    private _Router: Router,
    private _HttpService: HttpService,
  ) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log(route?.params);
    
    const {id} = route?.params   
    return this._HttpService.get(`${APIs.productPage}/${id}`)
    .pipe(
        map( (res: HResponse): any => {
        if (res.isSuccess) {    
          return {...res, ...route?.params};
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
