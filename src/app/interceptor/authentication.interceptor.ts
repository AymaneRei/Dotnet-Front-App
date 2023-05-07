import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AutenticationInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // add auth header with jwt if account is logged in and request is to the api url
    const accessToken = this.authenticationService.getAccessToken();
    const isApiUrl = request.url.startsWith(environment.domainName);
    const isLoginUrl = request.url.endsWith('/login');

    if (accessToken != null && isApiUrl && !isLoginUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 /* && isLoginUrl*/) {
          // The refresh token request has failed, so we need to log out the user
          this.authenticationService.logOut();
        }
        // else if (error.status === 401 && !isLoginUrl) {
        //   // The request has failed with a 403 error, which means that the access token has expired
        //   // We need to send a refresh token request to get a new access token
        //   return this.authenticationService.refresh().pipe(
        //     tap((response) => {
        //       // The refresh token request has succeeded, so we need to retry the original request with the new access token
        //       request = request.clone({
        //         setHeaders: {
        //           Authorization: `Bearer ${response.accessToken}`,
        //         },
        //       });
        //       return next.handle(request);
        //     })
        //   );
        // }
        return throwError(error);
      })
    );
  }
}
