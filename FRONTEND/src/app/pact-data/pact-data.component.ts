import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-pact-data',
  templateUrl: './pact-data.component.html',
  styleUrls: ['./pact-data.component.css']
})
export class PactDataComponent implements OnInit {
  displayedColumns: string[] = ['consumer', 'provider', 'pactFile', 'status', 'runDuration'];
  dataSource = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.pactData$.subscribe(data => {
      
    });
  }
}