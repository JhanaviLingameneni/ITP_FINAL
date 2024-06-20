import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-micro2',
  templateUrl: './micro2.component.html',
  styleUrl: './micro2.component.css'
})
export class Micro2Component {
  consumer: string = '';
  producer: string = '';
  blur: boolean = false;

  constructor(private router: Router) {}

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
    console.log('Navigating with:', { consumer: this.consumer, producer: this.producer });
    this.router.navigate(['/pact2'], { state: { consumer: this.consumer, producer: this.producer } });
  }
}
