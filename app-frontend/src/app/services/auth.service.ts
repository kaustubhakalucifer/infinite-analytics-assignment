import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(HttpClient) private _http: HttpClient,
    private _router: Router
  ) {}

  public getSessionDetails(): Observable<{ email: string }> {
    return this._http.get<{ email: string }>(
      `${environment.serverUrl}/session`,
      {
        withCredentials: true,
      }
    );
  }

  public loginWithGoogle() {
    window.location.href = `${environment.serverUrl}/auth/google`;
  }

  public logout() {
    this._http
      .get(`${environment.serverUrl}/session/logout`, { withCredentials: true })
      .subscribe(() => {
        this._router.navigate(['/login']);
      });
  }

  public loginService(data: {
    emailAddress: string;
    password: string;
  }): Observable<any> {
    return this._http.post(`${environment.serverUrl}/login`, data, {
      withCredentials: true,
    });
  }

  public registerService(data: {
    emailAddress: string;
    password: string;
  }): Observable<any> {
    return this._http.post(`${environment.serverUrl}/register`, data, {
      withCredentials: true,
    });
  }
}
