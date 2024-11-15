import { Component } from '@angular/core';
import { ChartData, ChartOptions, LabelItem } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent {
  public chartData: ChartData<'line'>;
  public chartLabels: LabelItem[];
  public chartOptions: ChartOptions;
  public stations: string[];

  // Data from the API response
  public data = {
    metadata: {
      stations: [
        { id: 'S117', name: 'Banyan Road' },
        { id: 'S50', name: 'Clementi Road' },
        { id: 'S44', name: 'Nanyang Avenue' },
        { id: 'S106', name: 'Pulau Ubin' },
        { id: 'S111', name: 'Scotts Road' },
        { id: 'S60', name: 'Sentosa' },
        { id: 'S115', name: 'Tuas South Avenue 3' },
      ],
      reading_type: 'DBT 1M F',
      reading_unit: 'deg C',
    },
    items: [
      {
        timestamp: '2024-11-14T16:35:00+08:00',
        readings: [
          { station_id: 'S117', value: 25.7 },
          { station_id: 'S50', value: 28.5 },
          { station_id: 'S44', value: 25.9 },
          { station_id: 'S106', value: 30.6 },
          { station_id: 'S111', value: 28.4 },
          { station_id: 'S60', value: 29 },
          { station_id: 'S115', value: 25.4 },
        ],
      },
    ],
    api_info: { status: 'healthy' },
  };

  constructor() {
    this.stations = this.data.metadata.stations.map((station) => station.name);
    this.createChartData();
  }

  stationColors = [
    '#1E90FF', // Dodger Blue
    '#4682B4', // Steel Blue
    '#5F9EA0', // Cadet Blue
    '#00BFFF', // Deep Sky Blue
    '#ADD8E6', // Light Blue
    '#87CEEB', // Sky Blue
    '#4682B4', // Steel Blue
  ];

  createChartData() {
    const readings = this.data.items[0].readings;

    const datasets = this.stations.map((station, index) => {
      const stationReading = readings.find(
        (r) => r.station_id === this.getStationId(station)
      );
      return {
        label: station,
        data: [stationReading ? stationReading.value : 0],
        borderColor: this.stationColors[index], // Specific border color
        backgroundColor: this.stationColors[index], // Specific fill color for bars
        fill: true, // Fill the bars if bar chart
        tension: 0.1, // This is ignored for bar charts, but useful for line charts
      };
    });

    this.chartData = {
      labels: [new Date(this.data.items[0].timestamp).toLocaleString()],
      datasets: datasets,
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Timestamp',
          },
        },
        y: {
          title: {
            display: true,
            text: this.data.metadata.reading_unit,
          },
        },
      },
    };
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getStationId(name: string) {
    const station = this.data.metadata.stations.find(
      (station) => station.name === name
    );
    return station ? station.id : null;
  }
}
