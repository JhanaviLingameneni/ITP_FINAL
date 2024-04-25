import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestResultsService} from './test-results.service';
import { OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ViewportScroller } from '@angular/common';
import { Chart } from 'angular-highcharts';
import { ChartModule } from 'angular-highcharts';
@Component({
  selector: 'app-tech-orchestrator',
  templateUrl: './tech-orchestrator.component.html',
  styleUrl: './tech-orchestrator.component.css',
  template: '<div [chart]="pieChart"></div>'
})
export class TechOrchestratorComponent implements OnInit {
  url: string = '';
  spec: string = '';
  env_variable1: string = '';
  env_variable2: string = '';
  resultSummary: any=null;
  isLoading:boolean=false;
  resultsReady:boolean=false
  pieChart:any;

  
  
  constructor(
    private spinner: NgxSpinnerService,
    private viewportScroller: ViewportScroller,
    private testResultsService: TestResultsService,
    private http: HttpClient) {}
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
  
  
}

  

