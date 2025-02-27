import { Building2, Calendar, Users } from 'lucide-react';
import { chartTheme } from './ChartConfig';

export const stats = [
  {
    title: 'Studios Assisted',
    value: '10,000+',
    description: 'Effortless bookings, more time to create.',
    icon: Building2,
    chartType: 'line' as const,
    chartData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Studios',
        data: [2000, 4000, 6000, 7500, 9000, 10000],
        borderColor: '#904af2',
        backgroundColor: 'rgba(144, 74, 242, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    chartOptions: {
      ...chartTheme,
      plugins: {
        ...chartTheme.plugins,
        legend: {
          display: false
        }
      }
    }
  },
  {
    title: 'Appointments Managed',
    value: '500,000+',
    description: 'AI scheduling, zero hassle.',
    icon: Calendar,
    chartType: 'bar' as const,
    chartData: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [{
        label: 'Appointments',
        data: [100000, 250000, 375000, 500000],
        backgroundColor: '#904af2',
        borderRadius: 4
      }]
    },
    chartOptions: {
      ...chartTheme,
      plugins: {
        ...chartTheme.plugins,
        legend: {
          display: false
        }
      },
      scales: {
        ...chartTheme.scales,
        y: {
          ...chartTheme.scales.y,
          ticks: {
            ...chartTheme.scales.y.ticks,
            callback: (value: number) => `${(value / 1000).toLocaleString()}k`
          }
        }
      }
    }
  },
  {
    title: 'Fewer No-Shows',
    value: '82%',
    description: 'Packed schedules, no wasted slots.',
    icon: Users,
    chartType: 'pie' as const,
    chartData: {
      labels: ['Successful Bookings', 'No-Shows'],
      datasets: [{
        data: [82, 18],
        backgroundColor: [
          '#904af2',
          'rgba(144, 74, 242, 0.2)'
        ],
        borderWidth: 0
      }]
    },
    chartOptions: {
      ...chartTheme,
      plugins: {
        ...chartTheme.plugins,
        tooltip: {
          ...chartTheme.plugins.tooltip,
          callbacks: {
            label: function(context: any) {
              return `${context.raw}%`;
            }
          }
        }
      }
    }
  }
];