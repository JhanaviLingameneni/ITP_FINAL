import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router, Routes } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ViewChild } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion'
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule, MatSidenavModule, MatDividerModule, RouterModule,MatExpansionModule,MatMenuModule, MatListModule, ButtonModule],
})
export class HeaderComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
 

  constructor(private observer: BreakpointObserver, private router: Router) {}
  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  
}
