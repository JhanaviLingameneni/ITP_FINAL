import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/data.service';
import { error } from 'console';
interface Row {
  name: string;
}

@Component({
  selector: 'app-micro-servi-interactions',
  templateUrl: './micro-servi-interactions.component.html',
  styleUrl: './micro-servi-interactions.component.css'
})
export class MicroServiInteractionsComponent implements OnInit  {
  title = 'microservices-dashboard';
  disabledServices: { [key: string]: boolean } = {};
  consumer: string = '';
  producer: string = '';
  rows: Row[] = [
    { name: 'User Interface (NGINX)' }, 
    { name: 'Data (Aggregator)' }, 
    { name: 'Groups' }, 
    { name: 'Devices' }, 
    { name: 'Services' },
    { name: 'Warranty' }, 
    { name: 'SignUp' }, 
    { name: 'Managers' }, 
    { name: 'Knowledge' },
     { name: 'Monitoring' },
    { name: 'Jobs' }, 
    { name: 'Collections' },
     { name: 'Certificates Manager' }, 
     { name: 'Communications' }, 
     { name: 'Organizations' },
    { name: 'Auth' }
  ];
  buttonRows: Row[][] = [];

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.buttonRows = this.getButtonRows(this.rows, 5);
  }

  getButtonRows(buttons: Row[], itemsPerRow: number): Row[][] {
    const rows: Row[][] = [];
    for (let i = 0; i < buttons.length; i += itemsPerRow) {
      rows.push(buttons.slice(i, i + itemsPerRow));
    }
    return rows;
  }

  onServiceClick(serviceName: string): void {
    console.log('Service clicked:', serviceName);
    if (serviceName === 'Auth') {
      this.consumer = serviceName;
      this.disableOtherButtons(serviceName);
    } else if (serviceName === 'Communications' || serviceName === 'Organizations') {
      this.producer = serviceName;
      this.disableOtherButtons(serviceName);
    }
  }

  disableOtherButtons(serviceName: string) {
    this.disabledServices = {};
    if (serviceName === 'Auth') {
      this.disabledServices['Organizations'] = false;
      this.disabledServices['Communications'] = false;
      this.rows.forEach((row) => {
        if (row.name !== 'Communications' && row.name !== 'Organizations') {
          this.disabledServices[row.name] = true;
        }
      });
    } else if (serviceName === 'Organizations') {
      this.disabledServices['Communications'] = true;
      this.rows.forEach((row) => {
        if (row.name !== 'Auth' && row.name !== 'Organizations') {
          this.disabledServices[row.name] = true;
        }
      });
    } else if (serviceName === 'Communications') {
      this.disabledServices['Organizations'] = true;
      this.rows.forEach((row) => {
        if (row.name !== 'Auth' && row.name !== 'Communications') {
          this.disabledServices[row.name] = true;
        }
      });
    }
  }

  execute(): void {
    console.log('Execute called');
    this.dataService.getPactData().subscribe({
      next: (data) => {
        console.log('Data received:', data);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
    this.router.navigate(['/pacts'],
      { queryParams:{ consumer:this.consumer, producer:this.producer}
    }
    )
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}