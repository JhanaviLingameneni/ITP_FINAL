import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ViewportScroller } from '@angular/common';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { ChartModule } from 'angular-highcharts';
import { Options, SeriesOptionsType } from 'highcharts';
import { TestResultsService } from './results.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-evaluation-metrics',
  templateUrl: './evaluation-metrics.component.html',
  styleUrls: ['./evaluation-metrics.component.css']
})
export class EvaluationMetricsComponent implements OnInit {
  
  url: string = '';
  spec: string = '';
  env_variable1: string = '';
  env_variable2: string = '';
  resultSummary: any=null;
  isLoading:boolean=false;
  resultsReady:boolean=false;
  barChart:any;
  pieChart:any;
  Highcharts:typeof Highcharts= Highcharts;
  chartOptions: Highcharts.Options={};
  runResults:any[]=[];
  testExecuted: boolean=false;

  constructor( private spinner: NgxSpinnerService,
    private viewportScroller: ViewportScroller,
    private testResultsService: TestResultsService,
    private dataService: DataService,
    private http: HttpClient,
    private router:Router) { }
    logOut() {
      sessionStorage.clear();
      this.router.navigate(['login']);
    }
  
    ngOnInit(): void {
      this.initializePieChart();
      this.initializebarChart();
      
      
  }
  

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
        env_variable1: this.env_variable1,
        env_variable2: this.env_variable2
    };
    this.testResultsService.executeTests(payload).subscribe({
      next:(data)=>{
        this.resultSummary='Tests executed successfully';
        this.isLoading=false;
        this.resultsReady=true;
        
        setTimeout(()=> {
          const element=document.getElementById('resultSummaryId');
          element?.scrollIntoView({behavior:'smooth'});
        }, 2000);
        //this.spinner.hide();

        this.viewportScroller.scrollToAnchor("resultSummaryId")
        this.resultSummary={
          
          totalDuration: data.totalDuration,
          totalPassed: data.totalPassed,
          totalFailed: data.totalFailed,
          totalPending: data.totalPending,
          totalSkipped: data.totalSkipped,
          totalSuites: data.totalSuites,
          totalTests: data.totalTests
        };
        
        this.testExecuted=true;
        this.initializePieChart();
        this.initializebarChart();
      },
      error:(error)=> {
        this.resultSummary='There was error executing the tests';
        console.error('Error fetching test results', error);
        this.spinner.hide();
      }
      
  });
  
  }
  initializePieChart():void{
   
    this.pieChart=new Chart({
      chart: {
        width:500,
        height:500,
        type: 'pie',
        plotShadow: false,
      },
      credits: {
        enabled: false,
      },
    
      plotOptions: {
        pie: {
          innerSize: '0%',
          borderWidth: 10,
        
          
          showInLegend:true,
          slicedOffset: 10,
          dataLabels: {
            distance:-50,
            enabled:true,
            format:'<b>{point.name}</b>:{point.y}',
            
            filter:{
              property:'percentage',
              operator:'>',
              value:4
            },
            style:{
              fontWeight:'bold',
              color:'white',
              textOutline:'0px',
              fontsize:'10px',
            },
            overflow:'justify',
            crop:false,
            connectorWidth: 0,
          },
        },
      },
      title: {
        verticalAlign: 'middle',
        floating: true,
        text: '',
      },
    
      legend: {
        align:'right',
        verticalAlign:'top',
        layout:'vertical',
        
        x:0,
        y:100,
        enabled: true,
      },
      series: [
        {
          name:'Results',
          type: 'pie',
          data: [
            { name: 'Total Passed', y: this.resultSummary.totalPassed, color: 'rgb(50,205,50)' },
    
            { name: 'Total Failed', y: this.resultSummary.totalFailed, color: 'rgb(255,0,0)' },
    
            { name: 'Total Pending', y: this.resultSummary.totalPending, color: '#00adb5' },
            { name: 'Total Skipped', y: this.resultSummary.totalSkipped, color: 'rgb(238,130,238)' },
            { name: 'Total Suites', y: this.resultSummary.totalSuites, color: 'rgb(255,165,0)' },
            { name: 'Total Tests', y: this.resultSummary.totalTests, color: 'rgb(0,0,255)' }
          ],
        },
      ],

    

    })
  }
  initializebarChart():void{
  this.barChart=new Chart({
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    xAxis:{
      categories:['Run1','Run2','Run3'],
      
      title:{
        text:'Runs'
      }
    },
    yAxis:{
      
      min:0,
      
    },
    
    series: [
      {
        name: 'Results',
        type: 'column',
        data: [{ name: 'Total Passed', y: this.resultSummary.totalPassed, color: 'rgb(50,205,50)' },
    
        { name: 'Total Failed', y: this.resultSummary.totalFailed, color: 'rgb(255,0,0)' },

        { name: 'Total Pending', y: this.resultSummary.totalPending, color: '#00adb5' },
        { name: 'Total Skipped', y: this.resultSummary.totalSkipped, color: 'rgb(238,130,238)' },
        { name: 'Total Suites', y: this.resultSummary.totalSuites, color: 'rgb(255,165,0)' },
        { name: 'Total Tests', y: this.resultSummary.totalTests, color: 'rgb(0,0,255)' }]
      } 
    ] 
  

  })
  
}
addRunResult(passed: number, failed: number): void {
  this.runResults.push({ passed:Number, failed:Number });
  this.updateChartData();
}

updateChartData(): void {
  if (!Array.isArray(this.runResults)) {
    console.error('runResults is not an array');
    return;
  }

  const categories = this.runResults.map(run => 'Run ${run.runNumber}');
  const passedData = this.runResults.map(run => run.passed);
  const failedData = this.runResults.map(run => run.failed);

  if (this.chartOptions && this.chartOptions.series) {
    this.chartOptions.xAxis = {
      ...(this.chartOptions.xAxis || {}), // Use existing xAxis properties if any
      categories: categories
    };
    if (this.chartOptions.series[0]) {
      (this.chartOptions.series[0] as any).data = passedData; // Data for passed results
    }
    if (this.chartOptions.series[1]) {
      (this.chartOptions.series[1] as any).data = failedData; // Data for failed results
    }

    // Now trigger the chart update.
    // You need to replace 'this.initializeBarChart' with the actual method to update your chart.
    // For example, if you are using Angular-Highcharts, you might need to trigger change detection
    // by updating a bound property, or by calling a method provided by the chart component or directive.
    // this.chart.update(); // This is a placeholder, please use the actual update call
  } else {
    console.error('Chart options or series is not defined');
  }
}
}