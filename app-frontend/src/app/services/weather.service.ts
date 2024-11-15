import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private _http: HttpClient) {}

  public getWeatherData(): Observable<any> {
    return this._http.get(
      'https://api.data.gov.sg/v1/environment/air-temperature'
    );
  }
}
