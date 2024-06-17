import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pact-pop-up',
  templateUrl: './pact-pop-up.component.html',
  styleUrl: './pact-pop-up.component.css'
})
export class PactPopUpComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  get status() {
    return this.data.status;
  }

  get pactData() {
    return this.data.pactData;
  }

}
