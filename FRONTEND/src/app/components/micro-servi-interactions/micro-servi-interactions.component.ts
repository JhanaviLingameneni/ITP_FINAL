import { Component } from '@angular/core';

@Component({
  selector: 'app-micro-servi-interactions',
  templateUrl: './micro-servi-interactions.component.html',
  styleUrl: './micro-servi-interactions.component.css'
})
export class MicroServiInteractionsComponent {
  title = 'microservices-dashboard';

  rows = [
   [ { name: 'User Interface (NGINX)' },
    { name: 'Data (Aggregator)'},
    {name: 'Groups'},
    {name: 'Devices'},
    {name: 'Services'},
    {name: 'Warranty'},
    {name:'SignUp'}
    
    // ... add objects for each microservice
  ],
 
  
  [
    {name:'Managers'},
    {name:'Knowledge'},
    {name:'Monitoring'},
    {name:'Jobs'},
    {name:'Collections'},
    {name:'Communications'},
    {name:'Organizations'},
    {name:'Certificates Manager'},
  ],
  
  [
    {name:'Auth'},
  ]
];
  
 
}




