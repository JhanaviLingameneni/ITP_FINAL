import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PactDataService } from './pact-data.service';
import { Pop2Component } from '../pop2/pop2.component';
import { MatDialog } from '@angular/material/dialog';
import { timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pact2',
  templateUrl: './pact2.component.html',
  styleUrl: './pact2.component.css'
})
export class Pact2Component {
  displayedColumns: string[] = ['consumer', 'provider', 'pactFile', 'status', 'lastActivity'];
  dataSource: any[] = [];

  constructor(private pactDataService: PactDataService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPactData();
    this.checkPactStatus();
  }

  loadPactData() {
    this.dataSource = this.pactDataService.getPactData();
  }

  checkPactStatus() {
    this.dataSource.forEach((pact) => {
      if (pact.status === 'In Progress') {
        this.pactDataService.getPactResult(pact).subscribe(result => {
          if (result.success) {
            pact.status = 'Success';
          } else if (result.fail) {
            pact.status = 'Fail';
          }
          // Call change detection or refresh dataSource if necessary
          this.dataSource = [...this.dataSource]; // Trigger change detection
        });
      }
    });
  }

  viewPactResult(pact: any, event: Event) {
    event.preventDefault(); // Prevent the default action of the click event
    console.log('Execution started');
    // Use RxJS timer to delay the execution
    timer(3000) // Adjust the delay as needed (3000 milliseconds = 3 seconds)
      .pipe(
        switchMap(() => this.pactDataService.getPactData())
      )
      .subscribe(
        (data) => {
          console.log('Data received:', data);
          if (data.status === 'pass') { // Check the correct property in data
            pact.status = 'Success';
            this.dialog.open(Pop2Component, {
              data: { status: 'Success', pactData: data }
            });
          } else {
            pact.status = 'Failed';
            this.dialog.open(Pop2Component, {
              data: { status: 'Failed', pactData: data }
            });
          }
          // Update the pact status in the data source
          this.dataSource = [...this.dataSource]; // Trigger change detection
        },
        (error) => {
          console.error('Error:', error);
          pact.status = 'Failed';
          this.dialog.open(Pop2Component, {
            data: { status: 'Failed' }
          });
          // Update the pact status in the data source
          this.dataSource = [...this.dataSource]; // Trigger change detection
        }
      );
  }
}