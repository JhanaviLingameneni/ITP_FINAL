import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './data.service';
import { PactData } from '../interfaces/pact';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { PactPopUpComponent } from '../components/pact-pop-up/pact-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface ExecutionResult {
  consumer: string;
  provider: string;
  pactFile: string;
  status: string;
  lastActivity: any;
}

@Component({
  selector: 'app-pacts',
  templateUrl: './pacts.component.html',
  styleUrl: './pacts.component.css',
  providers:[DatePipe]
})
export class PactsComponent implements OnInit{
  

  consumer: string = '';
  provider: string = '';
  dataSource = new MatTableDataSource<ExecutionResult>();
  executionResults: ExecutionResult[] = [];

  displayedColumns: string[] = ['consumer', 'provider', 'pactFile', 'status', 'lastActivity'];

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private dialog:MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.consumer = params['consumer'];
      this.provider = params['producer'];
      this.execute();
      this.loadExecutionResults();
    });
  }

  execute(): void {
    console.log('Execute called');
    const startTime = new Date();

    this.dataService.getPactData().subscribe(
      (data) => {
        console.log('Data received:', data);
        const endTime = new Date();
        const status = 'Active'; // Based on your backend response
        setTimeout(()=>{

       
        this.executionResults.push({
          consumer: this.consumer,
          provider: this.provider,
          pactFile: 'pact-data',
          status: status,
          lastActivity: this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss')
        });

        this.dataSource.data = this.executionResults; // Update the data source
      },3000);
      this.saveExecutionResults();
      },
      (error) => {
        console.error('Error:', error);
        const endTime = new Date();
        const status = 'Failed'; // Based on your backend response
        setTimeout(()=>{
        

        this.executionResults.push({
          consumer: this.consumer,
          provider: this.provider,
          pactFile: 'pact-data',
          status: status,
          lastActivity: this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss')
        });

        this.dataSource.data = this.executionResults; // Update the data source
      },3000);
      }
    );
  }
  saveExecutionResults(): void {
    localStorage.setItem('executionResults', JSON.stringify(this.executionResults));
}

loadExecutionResults(): void {
    const savedResults = localStorage.getItem('executionResults');
    if (savedResults) {
        this.executionResults = JSON.parse(savedResults);
        this.dataSource.data = this.executionResults;
    }
}

  
  logOut() :void{
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
  openPactFile() {
    console.log('Execution started');

        // Use RxJS timer to delay the execution
        timer(3000) // Adjust the delay as needed (3000 milliseconds = 3 seconds)
            .pipe(
                switchMap(() => this.dataService.getPactData())
            )
            .subscribe(
                (data) => {
                    console.log('Data received:', data);

                    if (data.status === 'success') { // Check the correct property in data
                        this.dialog.open(PactPopUpComponent, {
                            data: { status: 'Success', pactData: data }
                        });
                    } else {
                        this.dialog.open(PactPopUpComponent, {
                            data: { status: 'Failed',pactData:data }
                        });
                    }
                },
                (error) => {
                    console.error('Error:', error);
                    this.dialog.open(PactPopUpComponent, {
                        data: { status: 'Failed' }
                    });
                }
            );
  }
}