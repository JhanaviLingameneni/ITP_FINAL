import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestResultsService} from './test-results.service';
import { OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ViewportScroller } from '@angular/common';
import * as Highcharts from 'highcharts';
import { ChartModule } from 'angular-highcharts';
import { Options, SeriesOptionsType } from 'highcharts';
import { Router } from '@angular/router';
import { text } from 'body-parser';
import { ChartOptions, ChartType } from 'chart.js';
import Chart from 'chart.js/auto';



@Component({
  selector: 'app-tech-orchestrator',
  templateUrl: './tech-orchestrator.component.html',
  styleUrl: './tech-orchestrator.component.css',
  template: ' <div [chart]="pieChart"></div>'
})
export class TechOrchestratorComponent implements OnInit {
  
  url: string = '';
  spec: string = '';
  env: string=''
  resultSummary: any=null;
  isLoading:boolean=false;
  resultsReady:boolean=false;
  pieChart:any;
  barChart:any;
  Highcharts:typeof Highcharts= Highcharts;
  chartOptions: Highcharts.Options={};
  runResults:any[]=[];
  name:string='';
  y:any;
  color:string='';
  constructor(
    private spinner: NgxSpinnerService,
    private viewportScroller: ViewportScroller,
    private testResultsService: TestResultsService,
    private router: Router,
    private http: HttpClient) {}
    logOut() {
      sessionStorage.clear();
      this.router.navigate(['login']);
    }
    ngOnInit(): void { 
      this.initializePieChart();
    }
   testExecuted: boolean=false;
  executeTests():void {
    this.isLoading=true;
    this.resultsReady=false
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
    }, 2000)
    const payload = {
      url: this.url,
      spec:this.spec,
      env:this.env,
    };
    this.testResultsService.getStoredResults().subscribe({
      next:(data)=>{
        this.resultSummary='Tests executed successfully';
        this.resultSummary={
          totalDuration: data.totalDuration,
          totalPassed: data.totalPassed,
          totalFailed: data.totalFailed,
          totalPending: data.totalPending,
          totalSkipped: data.totalSkipped,
          totalSuites: data.totalSuites,
          totalTests: data.totalTests
          };
        this.isLoading=false;
        this.resultsReady=true;
        setTimeout(()=> {
          const element=document.getElementById('resultSummaryId');
          element?.scrollIntoView({behavior:'smooth'});
        }, 2000);
        this.viewportScroller.scrollToAnchor("resultSummaryId")
        this.testExecuted=true; 
        
      },
        
      error:(error)=> {
        this.resultSummary='There was error executing the tests';
        console.error('Error fetching test results', error);
        this.spinner.hide();
      } 
  });
}
initializePieChart():void{
  this.pieChart = new Chart("MyChart", {
    type: 'pie', //this denotes tha type of chart

    data: {// values on X-Axis
      labels: ['Total Passed', 'Total Failed','Total Pending','Total Skipped','Total Suites' ],
       datasets: [{
  
  data: [12, 1, 1, 0, 1],
  backgroundColor: [
    'Green',
    'Red',
    'orange',
    'yellow',
    'blue',			
  ],
  hoverOffset: 4
}],
    },
    options: {
      aspectRatio:2.5
    }

  });
}



}
              
        
  
  
     
  
  
  
   
  


 

  
 
  

