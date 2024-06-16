import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './data.service';
import { PactData } from '../interfaces/pact';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
interface ExecutionResult {
  consumer: string;
  provider: string;
  pactFile: string;
  status: string;
  lastActivity: string;
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
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.consumer = params['consumer'];
      this.provider = params['producer'];
      this.execute();
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
        const lastActivity = this.formatDateTime(endTime);

        this.executionResults.push({
          consumer: this.consumer,
          provider: this.provider,
          pactFile: 'pact-data',
          status: status,
          lastActivity: lastActivity
        });

        this.dataSource.data = this.executionResults; // Update the data source
      },
      (error) => {
        console.error('Error:', error);
        const endTime = new Date();
        const status = 'Failed'; // Based on your backend response
        const lastActivity = this.formatDateTime(endTime);

        this.executionResults.push({
          consumer: this.consumer,
          provider: this.provider,
          pactFile: 'pact-data',
          status: status,
          lastActivity: lastActivity
        });

        this.dataSource.data = this.executionResults; // Update the data source
      }
    );
  }

  private formatDateTime(date: Date): string {
    const dateString = this.datePipe.transform(date, 'yyyy-MM-dd');
    const timeString = this.datePipe.transform(date, 'HH:mm:ss');
    return '${dateString} ${timeString}';
  }
  logOut() :void{
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}


