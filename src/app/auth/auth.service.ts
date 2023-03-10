import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { API_KEY } from '../secrets/api-secrets';
import { User } from './user.model';

export interface AuthResponseData {
  kind?: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

// interface LoginResponseData {
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string;
//   registered: boolean;
// }
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any = null;
  //

  signUpApiUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY;
  signInApiUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
    API_KEY;

  constructor(private http: HttpClient, private router: Router) {}
  //
  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    // localStorage.clear();
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }
  //
  private handleAuthentication(
    email: string,
    id: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    //
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    // store the user data
    localStorage.setItem('userData', JSON.stringify(user));

    console.log('user: ', user);
  }
  //
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration); // calculate the remaining time to expiration
    }
  }
  //
  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
  //
  private handleError(errResponse: HttpErrorResponse) {
    let errMsg = 'Authentication error'; // 'An unknown error occured!'
    if (!errResponse.error || !errResponse.error.error) {
      return throwError(() => new Error(errResponse.message));
    }
    switch (errResponse.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errMsg = 'There is no user record corresponding to this email.';
        break;
      case 'INVALID_PASSWORD':
        errMsg = 'The password is invalid.';
        break;
      case 'USER_DISABLED':
        errMsg = 'The use account has been disabled.';
        break;
      case 'EMAIL_EXISTS':
        errMsg = 'The email provided already exists.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errMsg = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errMsg =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;

      default:
        break;
    }

    return throwError(() => new Error(errResponse.message));
  }
  ///
  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signInApiUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((errResponse) => {
          console.log(errResponse);
          return this.handleError(errResponse);
        }),
        tap((respData) => {
          this.handleAuthentication(
            respData.email,
            respData.localId,
            respData.idToken,
            +respData.expiresIn
          );
        })
      );
  }
  //

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signUpApiUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((err) => {
          return this.handleError(err);
        }),
        tap((respData) => {
          this.handleAuthentication(
            respData.email,
            respData.localId,
            respData.idToken,
            +respData.expiresIn
          );
        })
      );
  }
}
