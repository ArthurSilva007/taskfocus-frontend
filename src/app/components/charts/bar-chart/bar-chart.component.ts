import { Component, AfterViewInit } from '@angular/core';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  template: `<canvas id="barChart"></canvas>`,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 250px; /* Ajuste a altura conforme necessário */
    }
  `]
})
export class BarChartComponent implements AfterViewInit {

  constructor() {
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(): void {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [{
          label: 'Hábitos Concluídos',
          data: [5, 7, 6, 8, 5, 4, 7],
          backgroundColor: 'rgba(120, 81, 229, 0.6)',
          borderColor: 'rgba(120, 81, 229, 1)',
          borderWidth: 1,
          borderRadius: 5,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
              color: '#a0a0a0'
            }
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: '#a0a0a0'
            }
          }
        }
      }
    });
  }
}
