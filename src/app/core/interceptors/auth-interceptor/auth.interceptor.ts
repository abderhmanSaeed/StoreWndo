import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';
import { BrowserService } from 'src/app/shared/services/browser-db/browser.service';
import { Constant } from '../../config/constant';
import { Languages } from 'src/app/shared/enums/languages/languages';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private _BrowserService: BrowserService,
    ){}
    
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const local = this._BrowserService.getItem(Constant.locale);

        let header:any = {
            lang: local ? local : Languages.AR
        };

        let guestToken = this._BrowserService.getItem(Constant.guestToken),
            authToken = this._BrowserService.getItem(Constant.token);

        let token = authToken ? authToken : guestToken;
        
        if(token){
            header['Authorization'] = `Bearer ${token}`;
            header['Feature-Policy'] = `autoplay`;
            const headers = new HttpHeaders(header);
            request = request.clone({ headers });
        }
        
        return next.handle(request);
    }
}