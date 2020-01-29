import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpErrorResponse } from '@angular/common/http';


import { AuthService } from './auth.service';
import { take, exhaustMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.getAuthStatusListener().pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + this.authService.getToken())
        });
        return next.handle(modifiedReq).pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            if (error.status === 401) {
              // 401 error unauthorized request

              // refresh the access token
              this.refreshAccessToken();

              this.authService.logout();
            }

            return throwError(error);
          })
        );
      }));
  }

  refreshAccessToken() {
    // TODO add a method in auth service to send an api request to refresh token

  }

}
