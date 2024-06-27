import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDrawer } from '@angular/material/sidenav';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { Popup2Component } from '../popup2/popup2.component';

export interface TableData {
  url: string;
  spec: string;
  env: string;
  status: string;
  lastActivity: string;
  statusColor?:string;
}
const ELEMENT_DATA: TableData[] = [
  // Add initial data here if any
];

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrl: './home2.component.css'
})


export class Home2Component {
  displayedColumns: string[] = ['url', 'spec', 'env', 'status', 'lastActivity'];
  dataSource: TableData[] = [];

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(Popup2Component, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addTestResult(result);
      }
    });
  }

  addTestResult(testData: any): void {
    const newRow: TableData = {
      ...testData,
      lastActivity: new Date().toLocaleString()
    };

    if (testData.status === 'pass') {
      newRow.status = 'Success';
      newRow.statusColor = 'green';
    } else if (testData.status === 'failed') {
      newRow.status = 'Failed';
      newRow.statusColor = 'red';
    } else {
      newRow.status = 'Failed';
      newRow.statusColor = 'red';
    }

    this.dataSource.push(newRow);
    this.dataSource = [...this.dataSource]; // Refresh the table
  }
  

}
