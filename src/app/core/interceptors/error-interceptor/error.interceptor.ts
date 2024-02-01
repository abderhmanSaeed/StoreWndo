import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpResponse,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { MessagesService } from "src/app/shared/services/messages/messages.service";
import { HResponse } from "src/app/shared/models/http-response/http-response";

@Injectable({
    providedIn: "root",
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(
        private _Router: Router,
        private _MessagesService: MessagesService,
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next
            .handle(request)
            .pipe(
                catchError((error) => this.errorHandler(error)),
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        const HResponse: HResponse = event.body;
                        if (HResponse.hasOwnProperty('isSuccess')) {
                            if (!HResponse.isSuccess) {
                                this._MessagesService.openErrorSnackBar(HResponse?.errorMessage);
                            }
                        }
                        
                    }
                    return event;   
                }),
            );
    }



    // Customize the default error handler here if needed
    private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
        if (response instanceof HttpErrorResponse) {

            if (response.error instanceof ErrorEvent) {
                // Client Side Error 
                console.error(response.error.message);

            } else {

                // Server Side Error 
                switch (response.status) {

                    case 401:  // Login
                        // let clearedData = ["..", "..",'..'];
                        // clearedData.forEach((element) => {
                        //     localStorage.removeItem(element);
                        // });
                        // this._Router.navigate(["dashboard/auth/login"]);
                        break;
    
                    case 403: // Forbidden
                        // this._Router.navigate(["/unauthorized"]);
                        break;

                    case 400: // Forbidden
                        // this._Router.navigate(["/unauthorized"]);

                        if (!response.error.IsSuccess) {

                            if (response.error.ErrorMessage) {
                                this._MessagesService.openErrorSnackBar(response.error.ErrorMessage);
                            } else {
                                this._MessagesService.openErrorSnackBar(response?.error?.error?.message);
                            }

                        } else {
                            this._MessagesService.openErrorSnackBar(response?.error?.error?.message);
                        }

                        break;
                        
                    default: // Forbidden Server error                    
                    this._MessagesService.openErrorSnackBar(response?.error?.error?.message);

                }
    
            }


        } else {
            this._MessagesService.openErrorSnackBar('something else happened');
        }

        throw response;
    }


}
