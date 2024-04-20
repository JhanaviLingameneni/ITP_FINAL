import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestResultsService} from './test-results.service';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-tech-orchestrator',
  templateUrl: './tech-orchestrator.component.html',
  styleUrl: './tech-orchestrator.component.css'
})
export class TechOrchestratorComponent {
  url: string = '';
  spec: string = '';
  env_variable1: string = '';
  env_variable2: string = '';
  resultSummary: any=null;

  constructor(
    private testResultsService: TestResultsService,
    private http: HttpClient) {}
    

   

  executeTests(): void {
    const payload = {
      url: this.url,
      spec:this.spec,
        env_variable1: this.env_variable1,
        env_variable2: this.env_variable2
    };
    this.testResultsService.executeTests(payload).subscribe({
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
      },
      error:(error)=> {
        this.resultSummary='There was error executing the tests';
        console.error('Error fetching test results', error);
      }
      
  });
  }
//latest result in fetchedSavedTestResult
  
}
