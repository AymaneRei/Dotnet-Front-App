import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import jwt_decode from 'jwt-decode';

import { environment } from 'src/environments/environment';
import { Token } from 'src/app/core/models/token.model';
import { Login } from '../core/models/login.model';
import { UserRequest } from '../core/models/userRequest.model';
import { User } from '../core/models/user.model';
import { UserUpdate } from '../core/models/userUpdate.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loginURl: string = environment.loginURl;
  private registerURl: string = environment.registerURl;
  private usersURl: string = environment.usersURl;
  private updateUserURl: string = environment.updateUserURl;
  private deleteUserURl: string = environment.deleteUserURl;

  constructor(private router: Router, private http: HttpClient) {}

  login(login: Login): Observable<Token> {
    return this.http.post<Token>(this.loginURl, login).pipe(
      tap((userData) => {
        localStorage.setItem('access_token', userData.access_token);
        // localStorage.setItem('refresh_token', userData.refresh_token);
        // const tokenInfo = this.getDecodedAccessToken(userData.access_token);
        const tokenInfo = this.getDecodedAccessToken(userData.access_token);
        const username: string = <string>Object.values(tokenInfo)[0];
        const roles: string[] = <string[]>Object.values(tokenInfo)[1];
        localStorage.setItem('username', username);
        if (typeof roles === 'string') {
          localStorage.setItem('role', roles);
        } else {
          roles.forEach((element, index) => {
            localStorage.setItem('role ' + index, element);
          });
        }
        return userData;
      }),
      catchError(this.handleError)
    );
  }

  // refresh(): Observable<any> {
  //   return this.http
  //     .post<any>(this.loginURl, {
  //       grantType: 'password',
  //       username: null,
  //       password: null,
  //       withRefreshToken: true,
  //       refreshToken: this.getRefreshToken(),
  //     })
  //     .pipe(
  //       tap((response) => {
  //         const userData = response as Token;
  //         localStorage.setItem('access_token', userData.access_token);
  //         localStorage.setItem('refresh_token', userData.refresh_token);
  //         const tokenInfo = this.getDecodedAccessToken(userData.access_token);
  //         localStorage.setItem('username', tokenInfo.username);
  //         return response;
  //       }),
  //       catchError(this.handleError)
  //     );
  // }

  register(user: UserRequest): Observable<User> {
    return this.http.post<User>(this.registerURl, user).pipe(
      tap((userData) => {
        console.log('All', userData);
        return userData;
      }),
      catchError(this.handleError)
    );
  }

  updateUser(user: UserUpdate): Observable<void> {
    return this.http
      .put<void>(this.updateUserURl + '/' + user.username, user)
      .pipe(
        tap((userData) => {
          return userData;
        }),
        catchError(this.handleError)
      );
  }

  deleteUser(username: string): Observable<void> {
    return this.http.delete<void>(this.deleteUserURl + '/' + username).pipe(
      tap((userData) => {
        return userData;
      }),
      catchError(this.handleError)
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersURl).pipe(
      tap((userData) => {
        console.log('All', userData);
        return userData;
      }),
      catchError(this.handleError)
    );
  }

  getUser(username: string): Observable<User> {
    return this.http.get<User>(this.usersURl + '/' + username).pipe(
      tap((userData) => {
        console.log('All', userData);
        return userData;
      }),
      catchError(this.handleError)
    );
  }

  logOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  isUserLoggedIn() {
    return this.getAccessToken() !== null;
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
