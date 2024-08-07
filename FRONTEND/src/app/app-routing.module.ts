import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TestComponent } from './components/test/test.component';
import { HeaderComponent } from './components/header/header.component';
import { EvaluationMetricsComponent } from './components/evaluation-metrics/evaluation-metrics.component';
import { TechOrchestratorComponent } from './components/tech-orchestrator/tech-orchestrator.component';
import { MicroServiInteractionsComponent } from './components/micro-servi-interactions/micro-servi-interactions.component';
import { PactsComponent } from './pacts/pacts.component';
import { PactDataComponent } from './pact-data/pact-data.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { TestOrchestratorComponent } from './components/test-orchestrator/test-orchestrator.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TrendsComponent } from './components/trends/trends.component';
import { ServiceInteractionsComponent } from './components/service-interactions/service-interactions.component';
import { PactPopUpComponent } from './components/pact-pop-up/pact-pop-up.component';
import { PiebarComponent } from './components/piebar/piebar.component';
import { TabComponent } from './components/tab/tab.component';
import { Micro2Component } from './components/micro2/micro2.component';
import { Pact2Component } from './components/pact2/pact2.component';
import { Pop2Component } from './components/pop2/pop2.component';
import { Piebar2Component } from './components/piebar2/piebar2.component';
import { Home2Component } from './components/home2/home2.component';
import { Popup2Component } from './components/popup2/popup2.component';



const routes: Routes = [
  {
    path:'Pie',
    component:PieChartComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
   
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path:'header',
    component: HeaderComponent
    
  },
  {
    path:'evaluation-metrics',
    component:EvaluationMetricsComponent ,
    pathMatch:'full',
    
  },
  {
    path:'tech-orchestrator',
    component:TechOrchestratorComponent,
    pathMatch:'full',
    
  },
  {
    path:'micro-servi-interactions',
    component:MicroServiInteractionsComponent,
    pathMatch:'full',
    
  },
  {
    path:'pacts',
    component:PactsComponent
  },
  {
    path:'pact-data',
    component:PactDataComponent
  },
  {
    path:'to',
    component:TestOrchestratorComponent
  },
  {
    path:'sidebar',
    component:SidebarComponent
  },
  {
    path:'navbar',
    component:NavbarComponent
  },
  {
    path:'sidenav',
    component:SidenavComponent
  },
  {
    path:'trends',
    component:TrendsComponent
  },
  {
    path:'si',
    component:ServiceInteractionsComponent
  },
  {
    path:'ppu',
    component:PactPopUpComponent
  },
  {
    path:'piebar',
    component:PiebarComponent
  },
  {
    path:'tab',
    component:TabComponent
  },
  {
    path:'micro2',
    component:Micro2Component
  },
  {
    path:'pact2',
    component:Pact2Component
  },
  {
    path:'pop2',
    component:Pop2Component
  },
  {
    path:'pb',
    component:Piebar2Component
  },
  {
    path:'home2',
    component:Home2Component
  },
  {
    path:'popup2',
    component:Popup2Component
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
