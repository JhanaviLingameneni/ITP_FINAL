import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDrawer } from '@angular/material/sidenav';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { interval } from 'rxjs';
import { switchMap,takeWhile } from 'rxjs/operators';



export interface ElementData {
  url: string;
  spec: string;
  env: string;
  status: string;
  lastActivity:any;
}
const ELEMENT_DATA: ElementData[] = [
  // Sample data
];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  activeSection='overview';
  displayedColumns: string[] = ['select', 'url', 'spec', 'env', 'status','lastActivity'];
  dataSource = new MatTableDataSource<ElementData>(ELEMENT_DATA);
  selection = new SelectionModel<ElementData>(true, []);

  constructor(private router: Router,
    private httpClient: HttpClient,
    public dialog: MatDialog,
  ) { }

  sidebarOpen = false;

  @ViewChild('drawer') drawer!: MatDrawer;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width:'600px'
    });

    dialogRef.componentInstance.runTest.subscribe((data: { url: string, spec: string, env: string }) => {
      this.addDataToTable(data.url, data.spec, data.env);
      setTimeout(()=>{
        dialogRef.close();
      }, 5000);
    });
  }
  addDataToTable(url: string, spec: string, env: string) {
    const newData: ElementData = {
      url: url,
      spec: spec,
      env: env,
      status: 'In progress',
      lastActivity: new Date().toLocaleDateString()
    };
    this.dataSource.data=
    [...this.dataSource.data, newData]; // Trigger table update
    const poller = interval(5000) // Poll every 5 seconds
      .pipe(
        switchMap(() => this.httpClient.get<any>('http://localhost:5000/api/v1/test-results/latest')), // Replace 'backend_results_url' with actual URL
        takeWhile(response => !this.areResultsComplete(response), true) // Stop polling when results are complete
      )
      .subscribe(response => {
        if (this.areResultsComplete(response)) {
          // Update the status to 'Active'
          newData.status = 'Active';
          this.dataSource.data = [...this.dataSource.data]; // Trigger table update
          poller.unsubscribe(); // Stop polling
        }
      });
  }

  areResultsComplete(response: any): boolean {
    // Add logic to determine if the test results indicate completion
    // For example, check if the response contains results of all test cases
    return response.totalTestCases === response.passedTestCases + response.failedTestCases;
  }
  

  toggleDrawer() {
    this.drawer.toggle();
  }
  logOut() :void{
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  refresh() {
    this.dataSource.filter='';
  }

  addNew() {
    const dialogRef=
     this.dialog.open(PopupComponent,{
      width:'600px'
     });
     
     dialogRef.afterClosed().subscribe(result=> {
      console.log('Dialog closed');
      
     });
  }
  
  
}