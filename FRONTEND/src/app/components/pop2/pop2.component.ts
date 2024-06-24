import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-pop2',
  templateUrl: './pop2.component.html',
  styleUrl: './pop2.component.css'
})
export class Pop2Component {
  constructor(
    public dialogRef: MatDialogRef<Pop2Component>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }


}
