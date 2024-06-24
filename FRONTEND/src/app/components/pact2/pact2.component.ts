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
export class Pact2Component implements OnInit {
  displayedColumns: string[] = ['consumer', 'producer', 'pactFile', 'status', 'lastActivity'];
  dataSource: any[] = [];

  constructor(private pactDataService: PactDataService, public dialog: MatDialog, private router:Router) {}

  ngOnInit(): void {
    this.loadPactData();
    this.checkPactStatus();
  }

  loadPactData() {
    this.dataSource = this.pactDataService.getPactData();
  }
  logOut() :void{
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  checkPactStatus() {
    this.dataSource.forEach(pact => {
      if (pact.status === 'In Progress') {
        this.pactDataService.getPactResult(pact.id).subscribe(result => {
          if (result.success) {
            pact.status = 'Success';
          } else if (result.fail) {
            pact.status = 'Fail';
          }
          this.updateDataSource();
        });
      }
    });
  }

  updateDataSource() {
    this.dataSource = [...this.dataSource];
  }

  viewPactResult(pact: any, event: Event) {
    event.preventDefault(); // Prevent the default action of the click event
    console.log('Execution started');

    // Use RxJS timer to delay the execution
    timer(3000) // Adjust the delay as needed (3000 milliseconds = 3 seconds)
      .pipe(
        switchMap(() => this.pactDataService.getPactResult(pact.id))
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
            pact.status = 'Fail';
            this.dialog.open(Pop2Component, {
              data: { status: 'Failed', pactData: data }
            });
          }
          // Update the pact status in the data source
          this.updateDataSource(); // Trigger change detection
        },
        (error) => {
          console.error('Error:', error);
          pact.status = 'Fail';
          this.dialog.open(Pop2Component, {
            data: { status: 'Failed'}
          });
          // Update the pact status in the data source
          this.updateDataSource(); // Trigger change detection
        }
      );
  }
}