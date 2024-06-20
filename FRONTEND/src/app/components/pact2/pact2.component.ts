import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PactDataService } from './pact-data.service';

@Component({
  selector: 'app-pact2',
  templateUrl: './pact2.component.html',
  styleUrl: './pact2.component.css'
})
export class Pact2Component {
  displayedColumns: string[] = ['consumer', 'producer', 'pactFile', 'status', 'lastActivity'];
  dataSource: any[] = [];

  constructor(private pactDataService: PactDataService) {}

  ngOnInit(): void {
    this.loadPactData();
    this.checkPactStatus();
  }

  loadPactData() {
    this.dataSource = this.pactDataService.getPactData();
  }

  checkPactStatus() {
    this.dataSource.forEach(pact => {
      if (pact.status === 'In Progress') {
        this.pactDataService.getPactResult(pact.id).subscribe(result => {
          if (result.success) {
            this.pactDataService.updatePactStatus(pact.id, 'Success');
          } else if (result.fail) {
            this.pactDataService.updatePactStatus(pact.id, 'Fail');
          }
        });
      }
    });
  }

  viewPactResult(id: number) {
    this.pactDataService.getPactResult(id).subscribe(result => {
      alert(JSON.stringify(result, null, 2));  // Replace with a proper modal
    });
  }
}

 


