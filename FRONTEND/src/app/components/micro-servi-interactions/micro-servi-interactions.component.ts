import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-micro-servi-interactions',
  templateUrl: './micro-servi-interactions.component.html',
  styleUrl: './micro-servi-interactions.component.css'
})
export class MicroServiInteractionsComponent {
  title = 'microservices-dashboard';
  disabledServices:{[key:string]:boolean}={};
  consumer: string ='';
  producer: string ='';
  onServiceClick(serviceName:string){
    console.log('Service clicked:',serviceName);
    if (serviceName==='Auth'){
      
      this.consumer=serviceName;
      
      if(this.producer ==='Auth'){
        //this.currentProducer=null;
      }
      }else if(serviceName=== 'Communications'|| serviceName === 'Organizations')
        {
          this.producer=serviceName;
          
          

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
    {name:'Communications'},
    {name:'Organizations'},
    // ... add objects for each microservice
  ],
  [
    {name:'Auth'},
  ]
];

  constructor(private router:Router,
    private dataService:DataService
  ){}
  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  executeInteraction(): void {
    this.router.navigate(['/pact-data']);
    
  }
  execute(){
    this.dataService.getPactData();
  }
 
}




