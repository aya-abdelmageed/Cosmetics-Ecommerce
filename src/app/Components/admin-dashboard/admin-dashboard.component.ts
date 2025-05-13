// admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  // Static data for demo purposes
  dashboardData = {
    totalProfit: 19500,
    totalProducts: 788,
    topSelling: 'Blusher',
    mostProfitable: 'Blusher',
    busiestDay: 'Friday'
  };

  ngOnInit() {
    Chart.register(...registerables);
    this.createPieChart();
    this.createLineChart();
    this.createBarChart();
  }

  createPieChart() {
    new Chart('profitPieChart', {
      type: 'pie',
      data: {
        labels: ['Cheeks', 'Lips', 'Eyes', 'Face', 'Nails'],
        datasets: [{
          data: [4500, 3800, 2200, 1500, 500],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF'
          ]
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Profit by Product Type'
          }
        }
      }
    });
  }

  createLineChart() {
    new Chart('salesLineChart', {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Products Sold',
          data: [150, 220, 188, 259, 700, 290, 400],
          borderColor: '#4BC0C0',
          tension: 0.1,
          fill: true
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Weekly Sales Trend'
          }
        }
      }
    });
  }

  createBarChart() {
    new Chart('brandBarChart', {
      type: 'bar',
      data: {
        labels: ['Maybelline', 'almay', 'MAC', 'Revlon', 'NYX', 'Covergirl', 'zorah'],
        datasets: [{
          label: 'Orders',
          data: [120, 95, 80, 65, 50, 45, 40],
          backgroundColor: '#FF6384'
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Orders by Brand'
          }
        }
      }
    });
  }
}
