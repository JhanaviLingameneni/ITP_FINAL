import { Component , Output, EventEmitter} from '@angular/core';
import { Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { TestResultsService } from './test-results.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit {
  @Output() runTest = new EventEmitter<{ url: string, spec: string, env: string }>();
  url: string = '';
  spec: string = '';
  env: string='';
  resultSummary: any=null;
  isLoading:boolean=false  ;
  isResultsReady:boolean=false;
  constructor(
    private testResultsService: TestResultsService,
    private router: Router,
    private http: HttpClient,
  private spinner:NgxSpinnerService,
  private dialogRef:MatDialogRef<PopupComponent>, @Inject(MAT_DIALOG_DATA) public data:any) {}
    ngOnInit(): void {
        
    }
  executeTests():void {
    this.isLoading=true;
    this.isResultsReady=false;
    this.spinner.show();
    setTimeout(()=>{
      
    }, 2000)
    const payload = {
      url: this.url,
      spec:this.spec,
      env:this.env,
    };
    this.testResultsService.executeTests(payload).subscribe({
      next:(data)=>{
        this.resultSummary='Tests executed successfully';
        this.isLoading=false;
        this.isResultsReady=true;
        this.spinner.hide();
        
        this.resultSummary={
          totalDuration: data.totalDuration,
          totalPassed: data.TotalPassed,
          totalFailed: data.TotalFailed,
          totalPending: data.totalPending,
          totalSkipped: data.totalSkipped,
          totalSuites: data.totalSuites,
          totalTests: data.totalTests
          };
       
        setTimeout(()=> {
          const element=document.getElementById('resultSummaryId');
          element?.scrollIntoView({behavior:'smooth'});
        }, 2000);
        
        
        
      },
        
      error:(error)=> {
        this.resultSummary='There was error executing the tests';
        console.error('Error fetching test results', error);
        this.isLoading=false;
        this.spinner.hide();
      } 
  });
  this.runTest.emit({ url: this.url, spec: this.spec, env: this.env });
  setTimeout(()=>{
    this.dialogRef.close();
  }, 5000);
}

onAdd():void {
  const data={
    url:this.url,
    spec:this.spec,
    env:this.env,
    Status:'Active',
    lastActivity: new Date().toISOString()
  };
 
  this.dialogRef.close();
}
cancel(): void {
  this.dialogRef.close();
}

back(): void {
  
  this.dialogRef.close();
}
 
  
  

}
