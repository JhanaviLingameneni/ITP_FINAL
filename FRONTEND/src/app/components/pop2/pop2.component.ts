import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-pop2',
  templateUrl: './pop2.component.html',
  styleUrl: './pop2.component.css'
})
export class Pop2Component {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  get status() {
    return this.data.status;
  }

  get pactData() {
    return this.data.pactData;
  }


}
