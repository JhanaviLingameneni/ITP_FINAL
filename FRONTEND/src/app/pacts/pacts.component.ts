import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './data.service';
import { PactData } from '../interfaces/pact';
import { MatTableDataSource } from '@angular/material/table';
interface ExecutionResult {
  consumer: string;
  producer: string;
  pactFile: string;
  status: string;
  lastActivity: string;
}
@Component({
  selector: 'app-pacts',
  templateUrl: './pacts.component.html',
  styleUrl: './pacts.component.css'
})
export class PactsComponent implements OnInit{
  displayedColumns:string[]=['consumer', 'producer', 'pactFile', 'status', 'lastActivity']
  consumer: string = '';
  producer: string = '';
  executionResults: ExecutionResult[] = [];
  dataSource = new MatTableDataSource<PactData>([]);

  constructor(private dataService: DataService,
    private router: Router,
    private route:ActivatedRoute
  ) {}
  ngOnInit(): void {
    
  }
  logOut() :void{
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

 
}


