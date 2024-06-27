import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { TestComponent } from './components/test/test.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { EvaluationMetricsComponent } from './components/evaluation-metrics/evaluation-metrics.component';
import { TechOrchestratorComponent } from './components/tech-orchestrator/tech-orchestrator.component';
import { MicroServiInteractionsComponent } from './components/micro-servi-interactions/micro-servi-interactions.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {NgxSpinnerModule} from 'ngx-spinner';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ChartModule } from 'angular-highcharts';
import { Chart } from 'angular-highcharts';
import {MatMenuModule} from '@angular/material/menu';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PactsComponent } from './pacts/pacts.component';
import { PactDataComponent } from './pact-data/pact-data.component';
import {MatTableModule} from '@angular/material/table';
import { PopupComponent } from './components/popup/popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TestOrchestratorComponent } from './components/test-orchestrator/test-orchestrator.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TrendsComponent } from './components/trends/trends.component';
import { ServiceInteractionsComponent } from './components/service-interactions/service-interactions.component';
import { PactPopUpComponent } from './components/pact-pop-up/pact-pop-up.component';

import { NgChartsConfiguration } from 'ng2-charts';
import { PiebarComponent } from './components/piebar/piebar.component';
import { TabComponent } from './components/tab/tab.component';
import { Micro2Component } from './components/micro2/micro2.component';
import { Pact2Component } from './components/pact2/pact2.component';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { Pop2Component } from './components/pop2/pop2.component';
import { Piebar2Component } from './components/piebar2/piebar2.component';
import { Home2Component } from './components/home2/home2.component';
import { Popup2Component } from './components/popup2/popup2.component';

const dbConfig: DBConfig = {
  name: 'PactDB',
  version: 1,
  objectStoresMeta: [{
    store: 'pacts',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'consumer', keypath: 'consumer', options: { unique: false } },
      { name: 'producer', keypath: 'producer', options: { unique: false } },
      { name: 'pactFile', keypath: 'pactFile', options: { unique: false } },
      { name: 'status', keypath: 'status', options: { unique: false } },
      { name: 'lastActivity', keypath: 'lastActivity', options: { unique: false } }
    ]
  }]
};







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TestComponent,
    EvaluationMetricsComponent,
    TechOrchestratorComponent,
    MicroServiInteractionsComponent,
    PactsComponent,
    PactDataComponent,
    PopupComponent,
    PieChartComponent,
    SidebarComponent,
    NavbarComponent,
    TestOrchestratorComponent,
    SidenavComponent,
    TrendsComponent,
    ServiceInteractionsComponent,
    PactPopUpComponent,
    PiebarComponent,
    TabComponent,
    Micro2Component,
    Pact2Component,
    Pop2Component,
    Piebar2Component,
    Home2Component,
    Popup2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    RouterModule,
    CommonModule,
    MatDividerModule,
    MatGridListModule,
    MatCardModule,
    NgxSpinnerModule ,
    CanvasJSAngularChartsModule,
    ChartModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideClientHydration(),
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
