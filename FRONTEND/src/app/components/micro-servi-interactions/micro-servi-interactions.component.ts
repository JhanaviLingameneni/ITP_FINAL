import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-micro-servi-interactions',
  templateUrl: './micro-servi-interactions.component.html',
  styleUrl: './micro-servi-interactions.component.css'
})
export class MicroServiInteractionsComponent {
  title = 'microservices-dashboard';
  disabledServices:{[key:string]:boolean}={};
  currentConsumer: string | null=null;
  currentProducer: string | null=null;
  onServiceClick(serviceName:string){
    console.log('Service clicked:',serviceName);
    if (serviceName==='Auth'){
      
      this.currentConsumer=serviceName;
      if(this.currentProducer ==='Auth'){
        this.currentProducer=null;
      }
      }else if(serviceName=== 'Communications'|| serviceName === 'Organizations')
        {
          this.currentProducer=serviceName;

        }
        if(serviceName==='Auth'){
          this.disabledServices={};
          for(const service of this.rows.flat()){
            if(service.name!== 'Communications' && service.name !== 'Organizations'){
              this.disabledServices[service.name]=true;
            }
          }
        }
      
       
      }
  rows = [
   [ { name: 'User Interface (NGINX)' },
    { name: 'Data (Aggregator)'},
    {name: 'Groups'},
    {name: 'Devices'},
    {name: 'Services'},
    {name: 'Warranty'},
    {name:'SignUp'},
    {name:'Managers'},
    {name:'Knowledge'},
    {name:'Monitoring'},
    {name:'Jobs'},
    {name:'Collections'},
    {name:'Certificates Manager'},
    
    // ... add objects for each microservice
  ],
 
  
  [
    {name:'Communications'},
    {name:'Organizations'},
  ],
  
  [
    {name:'Auth'},
  ]
];

  constructor(private router:Router){}
  executeInteraction(): void {
    this.router.navigate(['/next-page']);
  }
 
}




