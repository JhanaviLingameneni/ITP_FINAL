import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PactDataService } from '../pact2/pact-data.service';

@Component({
  selector: 'app-micro2',
  templateUrl: './micro2.component.html',
  styleUrl: './micro2.component.css'
})
export class Micro2Component {
  consumer: string = '';
  producer: string = '';
  blur: boolean = false;

  constructor(private router: Router, private pactDataService: PactDataService) {}

  updateConsumer(buttonName: string) {
    this.consumer = buttonName;
    this.blur = buttonName === 'Auth';
  }

  updateProducer(buttonName: string) {
    this.producer = buttonName;
    if (buttonName === 'Organizations') {
      this.blur = true;
    } else if (buttonName === 'Communications') {
      this.blur = true;
    } else {
      this.blur = false;
    }
  }

  handleProducerInput() {
    if (this.producer === 'Organizations') {
      this.blur = true;
    } else if (this.producer === 'Communications') {
      this.blur = true;
    } else {
      this.blur = false;
    }
  }

  execute() {
    const data = {
      id: this.pactDataService.getPactData().length + 1,  // Unique ID
      consumer: this.consumer,
      producer: this.producer,
      pactFile: 'Generated Pact',
      status: 'In Progress',
      lastActivity: new Date().toLocaleString()
    };

    this.pactDataService.addPactData(data);
    this.router.navigate(['/pact2']);
  }
}
