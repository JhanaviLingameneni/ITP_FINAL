import { Component,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDrawer } from '@angular/material/sidenav';
import { OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ViewportScroller } from '@angular/common';
import * as Highcharts from 'highcharts';
import { ChartModule } from 'angular-highcharts';
import { Options, SeriesOptionsType } from 'highcharts';
import { Router } from '@angular/router';
import { text } from 'body-parser';
import { ChartOptions, ChartType } from 'chart.js';
import Chart from 'chart.js/auto';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { PieChartComponent } from '../../pie-chart/pie-chart.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  constructor(
    private router: Router,
    private http: HttpClient) {}

  toggleDrawer() {
    this.drawer.toggle();
  }
  logOut() :void{
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
