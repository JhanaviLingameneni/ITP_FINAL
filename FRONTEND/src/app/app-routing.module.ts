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

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
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
    component:EvaluationMetricsComponent 
  },
  {
    path:'tech-orchestrator',
    component:TechOrchestratorComponent
  },
  {
    path:'micro-servi-interactions',
    component:MicroServiInteractionsComponent
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
