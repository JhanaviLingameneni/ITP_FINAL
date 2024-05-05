import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { PactData } from '../interfaces/pact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pact-data',
  templateUrl: './pact-data.component.html',
  styleUrls: ['./pact-data.component.css']
})

export class PactDataComponent implements OnInit {
  displayedColumns: string[] = ['consumer', 'provider', 'pactFile', 'status', 'runDuration'];
  dataSource : PactData[] =[]

  constructor(private dataService: DataService, private router: Router) {}
  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
                            
      // Assuming the response will have the data directly accessible
      this.dataSource = [{
        consumer:'Auth',
        provider: 'Organizations',
        pactFile: 'pact-data',
        status:'Pass',
        runDuration:'10 seconds',
        
      }]; // You might need to adjust based on the actual structure
        console.log(this.dataSource);
        
    }
}