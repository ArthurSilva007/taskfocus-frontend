import { Component, AfterViewInit, Input } from '@angular/core';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  template: `<canvas [id]="chartId"></canvas>`,
  styles: [`
    :host {
      display: block;
      position: relative;
      margin: auto;
      height: 180px;
      width: 180px;
    }
  `]
})
export class PieChartComponent implements AfterViewInit {
  @Input() chartId: string = 'pieChart';
  // Você pode passar dados via @Input para torná-lo reutilizável
  @Input() data: any;

  constructor() {
    Chart.register(PieController, ArcElement, Tooltip, Legend);
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(): void {
    // Dados mockados se não forem fornecidos
    const chartData = this.data || {
      labels: ['Estudo', 'Trabalho', 'Lazer'],
      values: [43, 35, 22],
      colors: ['#7851e5', '#5a3aa4', '#3c256b']
    };

    const ctx = document.getElementById(this.chartId) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: chartData.labels,
        datasets: [{
          data: chartData.values,
          backgroundColor: chartData.colors,
          hoverOffset: 4,
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: '#a0a0a0',
              boxWidth: 15,
              padding: 15
            }
          },
        },
      }
    });
  }
}
