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
import { StorageService } from '../home/storage.service';
import {MatTabsModule} from '@angular/material/tabs';
import { TestResultsService } from './test-results.service';

interface TestResult {
  TotalPassed: number;
  TotalFailed: number;
  TotalSkipped: number;
  TotalPending: number;
}
interface TooltipEvent {
  entries: {
    dataPoint: { label: string; y: number };
    dataSeries: { name: string };
  }[];
}
export interface ElementData {
  url: string;
  spec: string;
  env: string;
  status: string;
  lastActivity:any;
  
}
const ELEMENT_DATA='elementData';
  // Sample data

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent  implements OnInit{
  activeSection='overview';
  displayedColumns: string[] = ['select', 'url', 'spec', 'env', 'status','lastActivity',];
  dataSource = new MatTableDataSource<ElementData>(this.getElementDataFromStorage());
  selection = new SelectionModel<ElementData>(true, []);
  

  constructor(private router: Router,
    private httpClient: HttpClient,
    public dialog: MatDialog,
    private storageService: StorageService,
    private testResultsService: TestResultsService
  ) { }

  sidebarOpen = false;

  @ViewChild('drawer') drawer!: MatDrawer;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.exportDataAsJSON();
    this.loadPieChartData();
    this.loadBarChartData();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width:'600px'
    });

    dialogRef.componentInstance.runTest.subscribe((data: { url: string, spec: string, env: string,uuid:string }) => {
      this.addDataToTable(data.url, data.spec, data.env, data.uuid);
      setTimeout(()=>{
        dialogRef.close();
      }, 5000);
    });
  }
  addDataToTable(url: string, spec: string, env: string, uuid:string) {
    const newData: ElementData = {
      url: url,
      spec: spec,
      env: env,
      status: 'Pass',
      lastActivity: new Date().toLocaleDateString(),
      
    };
    console.log('New data:',newData);
    this.dataSource.data.push(newData);
    this.dataSource.data = [...this.dataSource.data]; // Refresh the table
    this.saveElementDataToStorage(this.dataSource.data);

    const poller = interval(5000).pipe(
      switchMap(() => this.httpClient.get<any>('http://localhost:5000/api/v1/test-results/latest')),
      takeWhile(response => this.areResultsComplete(response), true)
    ).subscribe(response => {
      console.log('Full API Response:', response); // Log the full response to inspect its structure
      const result = response.result; // Adjust this line based on actual response structure
      if (result && result.uuid) {
        this.addDataToTable(result.url, result.spec, result.env, result.uuid);
      } else {
        console.error('UUID not found in the response'); // Debug: UUID missing
      }
    });
    this.setStatusTimer(newData);
    this.exportDataAsJSON();
  }
  

  
  areResultsComplete(response: any): boolean {
    console.log('Checking if results are complete:', response);
    return response.TotalTests === response.TotalPassed + response.TotalFailed;
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
  saveElementDataToStorage(data: ElementData[]) {
    this.storageService.setItem(ELEMENT_DATA, data);
  }

  // Get data from localStorage
  getElementDataFromStorage(): ElementData[] {
    return this.storageService.getItem(ELEMENT_DATA) || [];
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
  exportDataAsJSON() {
    const data = this.getElementDataFromStorage();
    const jsonData = JSON.stringify(data, null, 2);
    localStorage.setItem('element_data', jsonData);
  }
  setStatusTimer(element: ElementData) {
    setTimeout(() => {
      element.status = 'Pass';
      this.updateElementData(element);
    }, 25000); // Change 10000 to the desired delay in milliseconds
  }
  updateElementData(element: ElementData) {
    const index = this.dataSource.data.findIndex(data => data.url === element.url);
    if (index !== -1) {
      this.dataSource.data[index] = element;
      this.dataSource._updateChangeSubscription(); // Notify the table to update
    }
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
  selectedTab: string = 'dashboard';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }






  pieChartOptions: any;
  barChartOptions: any;

  

  

  loadPieChartData(): void {
    this.testResultsService.getLatestResult().subscribe((data: TestResult[]) => {
      const result = data[0];
      this.pieChartOptions = {
        animationEnabled: true,
        title: {
          text: ""
        },
        data: [{
          type: "doughnut",
          startAngle: 240,
          yValueFormatString: "##0\"\"",
          indexLabel: "{label} {y}",
          dataPoints: [
            { y: result.TotalPassed, label: "Passed", color:'#4CAF50'},
            { y: result.TotalFailed, label: "Failed", color:'#F44336' },
            { y: result.TotalSkipped, label: "Skipped", color:'#2196F3'  }
          ]
        }]
      };
    });
  }

  loadBarChartData(): void {
    this.testResultsService.getLastTenResults().subscribe((data: TestResult[]) => {
      const labels = data.map((_, index: number) => 'Run ' + (index + 1));
      const passed = data.map((result: TestResult) => result.TotalPassed);
      const failed = data.map((result: TestResult) => result.TotalFailed);
      const skipped = data.map((result: TestResult) => result.TotalSkipped);
      
  
      this.barChartOptions = {
        animationEnabled: true,
        title: {
          text: ""
        },
        axisY: {
          title: ""
        },
        toolTip: {
          shared: true,
          content: function(e: TooltipEvent) {
            let content = "Run: " + e.entries[0].dataPoint.label + "<br/>";
            for (let i = 0; i < e.entries.length; i++) {
              content += e.entries[i].dataSeries.name + ": " + e.entries[i].dataPoint.y + "<br/>";
            }
            return content;
          }
        },
        data: [
          {
            type: "stackedColumn",
            name: "Passed",
            color:'#4CAF50',
            showInLegend: "true",
            dataPoints: labels.map((label, index) => ({ label, y: passed[index] }))
          },
          {
            type: "stackedColumn",
            name: "Failed",
            color:'#F44336',
            showInLegend: "true",
            dataPoints: labels.map((label, index) => ({ label, y: failed[index] }))
          },
          {
            type: "stackedColumn",
            name: "Skipped",
            color:'#2196F3',
            showInLegend: "true",
            dataPoints: labels.map((label, index) => ({ label, y: skipped[index] }))
          }
        ]
      };
    });
  }
 
}
