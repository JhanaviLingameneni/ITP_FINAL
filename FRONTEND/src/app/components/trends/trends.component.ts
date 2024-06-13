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
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrl: './trends.component.css'
})
export class TrendsComponent implements OnInit {
  activeSection='overview';
  displayedColumns: string[] = ['select', 'url', 'spec', 'env', 'status','lastActivity'];
  dataSource = new MatTableDataSource<ElementData>(ELEMENT_DATA);
  selection = new SelectionModel<ElementData>(true, []);

  constructor(private router: Router,
    private http: HttpClient,
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
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const overviewSection = document.getElementById('overview');
    const trendsSection = document.getElementById('trends');

    const overviewTop = overviewSection?.getBoundingClientRect().top || 0;
    const trendsTop = trendsSection?.getBoundingClientRect().top || 0;

    if (trendsTop <= window.innerHeight / 2) {
      this.activeSection = 'trends';
    } else if (overviewTop <= window.innerHeight / 2) {
      this.activeSection = 'overview';
    }
  }

}
