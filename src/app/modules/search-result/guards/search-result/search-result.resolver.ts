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
export class SearchResultResolver implements Resolve<boolean> {

  constructor(
    private _Router: Router,
    private _HttpService: HttpService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    
    const query = {
      ...route?.queryParams
    }    

    if (!query['text']) {
      delete query['text']
    }    
    return this._HttpService.get(APIs.filteredDataForWeb, query)
    .pipe(
        map( (res: HResponse): any => {
        if (res.isSuccess) {    
          return {...res, ...route?.queryParams};
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
