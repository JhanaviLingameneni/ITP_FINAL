import { Component , Output, EventEmitter} from '@angular/core';
import { Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TestResultsService } from './test-results.service';
import { of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-popup2',
  templateUrl: './popup2.component.html',
  styleUrl: './popup2.component.css'
})
export class Popup2Component {
  isLoading:boolean=false  ;
  isResultsReady:boolean=false;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<Popup2Component>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private testResultsService: TestResultsService,
    private spinner:NgxSpinnerService,
  ) {
    this.form = this.fb.group({
      url: ['', Validators.required],
      spec: ['', Validators.required],
      env: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  runTest(): void { if (this.form.valid) {
    this.isLoading=true;
    this.spinner.show();
    of(null).pipe(
      delay(2000), // Simulate loading effect for 2 seconds
      switchMap(() => this.testResultsService.executeTests(this.form.value))
    ).subscribe(
      response => {
        this.isLoading=false;
        this.spinner.hide();
        console.log('API Response:', response);
        this.dialogRef.close({ ...this.form.value, status: response.status });
      },
      error => {
        this.isLoading = false;
        console.error('Error running test:', error);
        this.dialogRef.close({ ...this.form.value, status: 'Failed' });
      }
    );
  }
}

}
