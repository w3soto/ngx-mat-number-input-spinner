import { Directive, HostListener, Input } from '@angular/core';
import { coerceNumberProperty } from "@angular/cdk/coercion";
import {
  _NgxMatNumberSpinnerBase,
  NGX_MAT_NUMBER_SPINNER_AUTO_DELAY,
  NGX_MAT_NUMBER_SPINNER_AUTO_REPEAT
} from "./ngx-mat-number-spinner-base.directive";


@Directive({
  selector: '[ngxMatNumberDecrementSpinner]',
  exportAs: 'ngxMatNumberDecrementSpinner',
  host: {
    'class': 'ngx-mat-number-decrement-spinner'
  }
})
export class NgxMatNumberDecrementSpinner extends _NgxMatNumberSpinnerBase {

  @Input('ngxMatNumberDecrementSpinnerAutoDelay')
  set autoDelay(val: number) {
    this._autoDelay = coerceNumberProperty(val, NGX_MAT_NUMBER_SPINNER_AUTO_DELAY);
  }

  @Input('ngxMatNumberDecrementSpinnerAutoRepeat')
  set autoRepeat(val: number) {
    this._autoRepeat = coerceNumberProperty(val, NGX_MAT_NUMBER_SPINNER_AUTO_REPEAT);
  }

  @HostListener('mousedown')
  mouseDown() {
    this.changed.emit(-1);
    this.startAutoUpdate(-1);
  }

  @HostListener('mouseup')
  mouseUp() {
    this.stopAutoUpdate();
  }

}
