import { Component, OnInit } from '@angular/core';
import { TestResultsService } from './test-results.service';
interface TestResult {
  TotalPassed: number;
  TotalFailed: number;
  TotalSkipped: number;
  TotalPending: number;
}
interface TooltipEvent {
  entries: {
    dataPoint: { label: string; y: number };
    dataSeries: { name: string };
  }[];
}

@Component({
  selector: 'app-piebar2',
  templateUrl: './piebar2.component.html',
  styleUrl: './piebar2.component.css'
})
export class Piebar2Component implements OnInit {
  pieChartOptions: any;
  barChartOptions: any;

  constructor(private testResultsService: TestResultsService) {}

  ngOnInit(): void {
    this.loadPieChartData();
    this.loadBarChartData();
  }

  loadPieChartData(): void {
    this.testResultsService.getLatestResult().subscribe((data: TestResult[]) => {
      const result = data[0];
      this.pieChartOptions = {
        animationEnabled: true,
        title: {
          text: ""
        },
        data: [{
          type: "doughnut",
          startAngle: 240,
          yValueFormatString: "##0\"\"",
          indexLabel: "{label} {y}",
          dataPoints: [
            { y: result.TotalPassed, label: "Passed", color:'#4CAF50'},
            { y: result.TotalFailed, label: "Failed", color:'#F44336' },
            { y: result.TotalSkipped, label: "Skipped", color:'#2196F3'  }
          ]
        }]
      };
    });
  }

  loadBarChartData(): void {
    this.testResultsService.getLastTenResults().subscribe((data: TestResult[]) => {
      const labels = data.map((_, index: number) => 'Run ' + (index + 1));
      const passed = data.map((result: TestResult) => result.TotalPassed);
      const failed = data.map((result: TestResult) => result.TotalFailed);
      const skipped = data.map((result: TestResult) => result.TotalSkipped);
      
  
      this.barChartOptions = {
        animationEnabled: true,
        title: {
          text: ""
        },
        axisY: {
          title: ""
        },
        toolTip: {
          shared: true,
          content: function(e: TooltipEvent) {
            let content = "Run: " + e.entries[0].dataPoint.label + "<br/>";
            for (let i = 0; i < e.entries.length; i++) {
              content += e.entries[i].dataSeries.name + ": " + e.entries[i].dataPoint.y + "<br/>";
            }
            return content;
          }
        },
        data: [
          {
            type: "stackedColumn",
            name: "Passed",
            color:'#4CAF50',
            showInLegend: "true",
            dataPoints: labels.map((label, index) => ({ label, y: passed[index] }))
          },
          {
            type: "stackedColumn",
            name: "Failed",
            color:'#F44336',
            showInLegend: "true",
            dataPoints: labels.map((label, index) => ({ label, y: failed[index] }))
          },
          {
            type: "stackedColumn",
            name: "Skipped",
            color:'#2196F3',
            showInLegend: "true",
            dataPoints: labels.map((label, index) => ({ label, y: skipped[index] }))
          }
        ]
      };
    });
  }
}
