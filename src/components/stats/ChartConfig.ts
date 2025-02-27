import { ChartOptions } from 'chart.js';

export const chartTheme: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        color: 'rgba(255, 255, 255, 0.8)',
        padding: 20,
        font: {
          size: 11,
          family: "'Poppins', sans-serif"
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: 'rgba(144, 74, 242, 0.2)',
      borderWidth: 1,
      padding: 12,
      displayColors: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.8)',
        font: {
          size: 10,
          family: "'Poppins', sans-serif"
        }
      }
    },
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.8)',
        font: {
          size: 10,
          family: "'Poppins', sans-serif"
        }
      }
    }
  }
};