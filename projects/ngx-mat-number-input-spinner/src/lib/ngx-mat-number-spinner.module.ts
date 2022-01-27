import { NgModule } from '@angular/core';
import {
  NgxMatNumberSpinner,
  NgxMatNumberIncrementSpinner,
  NgxMatNumberDecrementSpinner
} from './ngx-mat-number-spinner.component';
import { MatRippleModule } from "@angular/material/core";



@NgModule({
  declarations: [
    NgxMatNumberSpinner,
    NgxMatNumberIncrementSpinner,
    NgxMatNumberDecrementSpinner
  ],
  imports: [
    MatRippleModule
  ],
  exports: [
    NgxMatNumberSpinner,
    NgxMatNumberIncrementSpinner,
    NgxMatNumberDecrementSpinner
  ]
})
export class NgxMatNumberSpinnerModule { }
