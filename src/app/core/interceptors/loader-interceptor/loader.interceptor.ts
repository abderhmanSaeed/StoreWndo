import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from "rxjs";
import { finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {
    count = 0;

    constructor(
        private _NgxSpinnerService: NgxSpinnerService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if ( !req?.urlWithParams.includes('hideLoader') ){
            this._NgxSpinnerService.show();
        }
        this.count++;
        return next.handle(req)
            .pipe(finalize(() => {
                this.count--;
                if (this.count == 0 || this.count < 0) this._NgxSpinnerService.hide()
            })
        );
    }
}