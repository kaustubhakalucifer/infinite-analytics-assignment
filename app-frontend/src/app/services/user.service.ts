import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

interface UpdateUserPayload {
  name?: string;
  bio?: string;
  emailAddress?: string;
  password?: string;
  photoUrl?: string;
  mobileNumber?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(@Inject(HttpClient) private _http: HttpClient) {}

  public getUserData(): Observable<any> {
    return this._http.get(`${environment.serverUrl}/user`, {
      withCredentials: true,
    });
  }

  public updateUserData(data: UpdateUserPayload): Observable<any> {
    return this._http.patch(`${environment.serverUrl}/user`, data, {
      withCredentials: true,
    });
  }
}
