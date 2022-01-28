import { NgModule } from '@angular/core';
import { MatRippleModule } from "@angular/material/core";

import { NgxMatNumberSpinner } from './ngx-mat-number-spinner.component';
import { NgxMatNumberIncrementSpinner } from "./ngx-mat-number-increment-spinner.directive";
import { NgxMatNumberDecrementSpinner } from "./ngx-mat-number-decrement-spinner.directive";


@NgModule({
  declarations: [
    NgxMatNumberSpinner,
    NgxMatNumberIncrementSpinner,
    NgxMatNumberDecrementSpinner,
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
export class NgxMatNumberInputSpinnerModule { }
