import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoinsService {
  constructor(private _http: HttpClient) {}

  public getExhangeDataService(): Observable<any> {
    return this._http.get(
      'https://data-api.binance.vision/api/v3/exchangeInfo'
    );
  }

  public tickerDataService(symbol: string): Observable<any> {
    return this._http.get(
      `https://data-api.binance.vision/api/v3/ticker/24hr?symbol=${symbol}`
    );
  }
}
