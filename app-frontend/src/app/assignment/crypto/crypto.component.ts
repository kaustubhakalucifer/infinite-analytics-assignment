import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { CoinsService } from '../../services/coins.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

@Component({
  selector: 'app-crypto',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './crypto.component.html',
  styleUrl: './crypto.component.scss',
})
export class CryptoComponent {
  symbols = [];

  // Function to generate a light color based on the coin name
  getBackgroundColor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert hash to a light color
    const color = `hsl(${hash % 360}, 100%, 90%)`;
    return color;
  }

  constructor(private _coinsService: CoinsService, private _dialog: MatDialog) {
    this._getExchangeData();
  }

  private _getExchangeData() {
    this._coinsService.getExhangeDataService().subscribe({
      next: (response) => {
        this.symbols = response['symbols'];
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  openDetailDialog(symbol: string) {
    this._dialog.open(DetailsDialogComponent, {
      data: symbol,
      height: '100vh',
      panelClass: 'trend-dialog',
    });
  }
}
