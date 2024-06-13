import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { PopupComponent } from '../popup/popup.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

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
  selector: 'app-test-orchestrator',
  templateUrl: './test-orchestrator.component.html',
  styleUrl: './test-orchestrator.component.css'
})
export class TestOrchestratorComponent implements OnInit{
  displayedColumns: string[] = ['select', 'url', 'spec', 'env', 'status','lastActivity'];
  dataSource = new MatTableDataSource<ElementData>(ELEMENT_DATA);
  selection = new SelectionModel<ElementData>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
   
    private router: Router,
    private http: HttpClient) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
