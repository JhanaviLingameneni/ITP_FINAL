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
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { PieChartComponent } from '../../pie-chart/pie-chart.component';


export interface UserData{
  url:string;
  spec:string;
  env:string;
  Status:string;
  lastActivity:any;

}
const ELEMENT_DATA:UserData[]=[
  {
    url:'',
    spec:'',
    env:'',
    Status:'',
    lastActivity:new Date().toISOString()
  },
];

@Component({
  selector: 'app-tech-orchestrator',
  templateUrl: './tech-orchestrator.component.html',
  styleUrl: './tech-orchestrator.component.css',
  template: ' <div [chart]="pieChart"></div>'
})
export class TechOrchestratorComponent implements OnInit {
  displayedColumns: string[]=['url','spec','env','Status','lastActivity']
  
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
  dataSource= new MatTableDataSource<UserData>(ELEMENT_DATA);
  y:any;
  color:string='';
  constructor(
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private viewportScroller: ViewportScroller,
    private testResultsService: TestResultsService,
    private router: Router,
    private http: HttpClient) {}
    applyFilter(event:Event ){
      const filterValue=(event.target as HTMLInputElement).value;
      this.dataSource.filter=filterValue.trim().toLocaleLowerCase();
    }
    onAdd():void{
      const data:UserData={
        url:this.url,
        spec:this.spec,
        env:this.env,
        Status:'Active',
        lastActivity:new Date().toISOString()
      };
      this.dataSource.data=[...this.dataSource.data, data];
    }
    Openpopup():void {
      const dialogRef=
     this.dialog.open(PopupComponent,{
      width:'600px'
     });
     
     dialogRef.afterClosed().subscribe(result=> {
      console.log('Dialog closed');
      this.refreshTable();
     });
    }
   
    refreshTable():void {
      this.dataSource.filter='';
    }

    logOut() :void{
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
    }, 2000)
    const payload = {
      url: this.url,
      spec:this.spec,
      env:this.env,
    };
    this.testResultsService.executeTests(payload).subscribe({
      next:(data)=>{
        this.resultSummary='Tests executed successfully';
        this.resultSummary={
          totalDuration: data.totalDuration,
          totalPassed: data.TotalPassed,
          totalFailed: data.TotalFailed,
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



}
              
        
  
  
     
  
  
  
   
  


 

  
 
  

