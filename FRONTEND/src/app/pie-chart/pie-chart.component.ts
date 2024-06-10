import { Component, OnInit } from '@angular/core';
import { TestResultsService } from './test-results.service';
import { Chart,registerables } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  pieChart: any;
  barChart: any;
  

  constructor(private testResultsService: TestResultsService) { Chart.register(...registerables);}

  ngOnInit() {
    this.loadTestResults();
  }

  loadTestResults() {
    this.testResultsService.getTestResultsd().subscribe(
      (data) => {
        console.log('Fetched data:', data); // Debugging line
        if (data) {
          const pieChartData = this.transformPieData(data);
          this.createPieChart(pieChartData);

          const barChartData = this.transformBarData(data);
          this.createBarChart(barChartData);
        } else {
          console.error('Invalid data format', data);
        }
      },
      (error) => {
        console.error('Error fetching test results', error);
      }
    );
  }
  transformPieData(data: any) {
    return [
      { y: data.totalPassed, name: 'Passed' },
      { y: data.totalFailed, name: 'Failed' },
      { y: data.totalPending, name: 'Pending' },
      { y: data.totalSkipped, name: 'Skipped' }
    ];
  }

  
  transformBarData(data: any) {
    // Example transformation for 10 runs
    return {
      labels: ['Run 1', 'Run 2', 'Run 3', 'Run 4', 'Run 5', 'Run 6', 'Run 7', 'Run 8', 'Run 9', 'Run 10'],
      datasets: [
        {
          label: 'Passed',
          data: [data.totalPassed, data.totalPassed, data.totalPassed, data.totalPassed, data.totalPassed, data.totalPassed, data.totalPassed, data.totalPassed, data.totalPassed, data.totalPassed],
          backgroundColor: 'green',
        },
        {
          label: 'Failed',
          data: [data.totalFailed, data.totalFailed, data.totalFailed, data.totalFailed, data.totalFailed, data.totalFailed, data.totalFailed, data.totalFailed, data.totalFailed, data.totalFailed],
          backgroundColor: 'red',
        },
        {
          label: 'Pending',
          data: [data.totalPending, data.totalPending, data.totalPending, data.totalPending, data.totalPending, data.pending, data.totalPending, data.totalPending, data.totalPending, data.totalPending],
          backgroundColor: 'yellow',
        },
        {
          label: 'Skipped',
          data: [data.totalSkipped, data.totalSkipped, data.totalSkipped, data.totalSkipped, data.totalSkipped, data.totalSkipped, data.totalSkipped, data.totalSkipped, data.totalSkipped, data.totalSkipped],
          backgroundColor: 'orange',
        }
      ]
    };
  }

  createPieChart(dataPoints: any[]) {
    this.pieChart = new Chart('MyPieChart', {
      type: 'pie',
      data: {
        labels: dataPoints.map(point => point.name),
        datasets: [{
          label: 'Test Results',
          data: dataPoints.map(point => point.y),
          backgroundColor: ['green', 'red', 'yellow', 'orange'],
          hoverOffset: 4,
        }],
      },
      options: {
        aspectRatio: 2.5,
        layout: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          }
        },
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 20,
              padding: 10,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          }
        }
      },
    });
  }


  createBarChart(chartData: any) {
    this.barChart = new Chart('MyBarChart', {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            
          }
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          }
        }
      },
    });
  }

 
}