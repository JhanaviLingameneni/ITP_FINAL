import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { PactData } from '../interfaces/pact';

@Component({
  selector: 'app-pact-data',
  templateUrl: './pact-data.component.html',
  styleUrls: ['./pact-data.component.css']
})

export class PactDataComponent implements OnInit {
  displayedColumns: string[] = ['consumer', 'provider', 'pactFile', 'status', 'runDuration'];
  dataSource : PactData[] =[]

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
                            
      // Assuming the response will have the data directly accessible
      this.dataSource = [{
        consumer:'Auth',
        provider: 'Organizations',
        pactFile: 'Auth-Organization.json',
        status:'Pass',
        runDuration:'10 seconds'}]; // You might need to adjust based on the actual structure
        console.log(this.dataSource);
    }
}