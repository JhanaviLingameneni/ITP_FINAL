import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pact2',
  templateUrl: './pact2.component.html',
  styleUrl: './pact2.component.css'
})
export class Pact2Component {
  displayedColumns: string[] = ['consumer', 'provider', 'pactFile', 'status', 'lastActivity'];
  dataSource: any[] = [];
  currentDate: string='';

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const consumer = navigation.extras.state['consumer'];
      const producer = navigation.extras.state['producer'];
      this.dataSource.push({
        consumer,
        provider: producer,
        pactFile: 'Generated Pact',
        status: 'Pending',
        lastActivity: new Date().toLocaleString()
      });
    } else {
      console.error('No state data found');
    }
  }

  ngOnInit(): void {}
  }

 


