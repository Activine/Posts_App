import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FbAuthResponse, User } from '../../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  public error$: Subject<string> = new Subject<string>()

  get token(): any {
    const expDate = new Date(localStorage.getItem('fb-token-exp') as string)
    if (new Date > expDate) {
      this.logout
      return null
    }
    return localStorage.getItem('fb-token')
  }

  login(user: User): Observable<any> {
    console.log(environment.API_KEY);
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.API_KEY}`, user)
      .pipe(
        tap(this.setToken as any),
        catchError(this.handleError.bind(this))
      )
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const { message } = error.error.error
    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Email is wrong')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Password is wrong')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not found')
        break
    }
    return throwError(() => error)

  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }
}

