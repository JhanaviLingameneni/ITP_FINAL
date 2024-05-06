import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestResultsService} from './test-results.service';
import { OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ViewportScroller } from '@angular/common';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { ChartModule } from 'angular-highcharts';
import { Options, SeriesOptionsType } from 'highcharts';
import { Router } from '@angular/router';


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
  barChart:any;
  pieChart:any;
  Highcharts:typeof Highcharts= Highcharts;
  chartOptions: Highcharts.Options={};
  runResults:any[]=[];
  
  
  
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
    }
   testExecuted: boolean=false;
  executeTests():void {
    this.isLoading=true;
    this.resultsReady=false
    
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
    }, 5000)
    
    const payload = {
      url: this.url,
      spec:this.spec,
      env:this.env,
    };
    this.testResultsService.executeTests(payload).subscribe({
      next:(data)=>{
        this.resultSummary='Tests executed successfully';
        this.isLoading=false;
        this.resultsReady=true;
        
        setTimeout(()=> {
          const element=document.getElementById('resultSummaryId');
          element?.scrollIntoView({behavior:'smooth'});
        }, 5000);
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
        
        
      },
      error:(error)=> {
        this.resultSummary='There was error executing the tests';
        console.error('Error fetching test results', error);
        this.spinner.hide();
      }
      
  });
  
  }
  
  }

   
  


 

  
 
  

