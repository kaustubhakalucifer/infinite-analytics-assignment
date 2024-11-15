import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoinsService } from '../../../services/coins.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-details-dialog',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './details-dialog.component.html',
  styleUrl: './details-dialog.component.scss',
})
export class DetailsDialogComponent {
  coinData = {
    symbol: '',
    priceChange: '',
    priceChangePercent: '',
    weightedAvgPrice: '',
    prevClosePrice: '',
    lastPrice: '',
    lastQty: '',
    bidPrice: '',
    bidQty: '',
    askPrice: '',
    askQty: '',
    openPrice: '',
    highPrice: '',
    lowPrice: '',
    volume: '',
    quoteVolume: '',
    openTime: 0,
    closeTime: 0,
    firstId: 0,
    lastId: 0,
    count: 0,
  };

  // Chart data
  chartData = {
    labels: ['Open', 'High', 'Low', 'Last Price'],
    datasets: [
      {
        data: [
          this.coinData.openPrice,
          this.coinData.highPrice,
          this.coinData.lowPrice,
          this.coinData.lastPrice,
        ],
        label: 'Price',
        fill: true,
        borderColor: '#4bc0c0',
        tension: 0.1,
      },
    ],
  };

  chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Price Type',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
        },
        beginAtZero: false,
      },
    },
  };

  // Price change percentage (used for trend indication)
  priceChangePercent = parseFloat(this.coinData.priceChangePercent);

  constructor(
    private _coinsService: CoinsService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this._getDetails();
  }

  private _getDetails() {
    this._coinsService.tickerDataService(this.data).subscribe({
      next: (response) => {
        console.log(response);
        this.coinData = response;
        this.priceChangePercent = parseFloat(this.coinData.priceChangePercent);
        // Chart data
        this.chartData = {
          labels: ['Open', 'High', 'Low', 'Last Price'],
          datasets: [
            {
              data: [
                this.coinData.openPrice,
                this.coinData.highPrice,
                this.coinData.lowPrice,
                this.coinData.lastPrice,
              ],
              label: 'Price',
              fill: true,
              borderColor: '#4bc0c0',
              tension: 0.1,
            },
          ],
        };
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
