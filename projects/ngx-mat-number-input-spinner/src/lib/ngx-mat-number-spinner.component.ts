import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty, NumberInput } from "@angular/cdk/coercion";

import {
  _NgxMatNumberSpinnerBase,
  NGX_MAT_NUMBER_SPINNER_AUTO_DELAY,
  NGX_MAT_NUMBER_SPINNER_AUTO_REPEAT,
  NgxMatNumberSpinnerSign
} from "./ngx-mat-number-spinner-base.directive";


@Component({
  selector: 'ngx-mat-number-spinner',
  templateUrl: './ngx-mat-number-spinner.component.html',
  styleUrls: ['./ngx-mat-number-spinner.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'ngxMatNumberSpinner',
  host: {
    'class': 'ngx-mat-number-spinner'
  }
})
export class NgxMatNumberSpinner extends _NgxMatNumberSpinnerBase {

  @Input()
  set autoDelay(val: NumberInput) {
    this._autoDelay = coerceNumberProperty(val, NGX_MAT_NUMBER_SPINNER_AUTO_DELAY);
  }

  @Input()
  set autoRepeat(val: NumberInput) {
    this._autoRepeat = coerceNumberProperty(val, NGX_MAT_NUMBER_SPINNER_AUTO_REPEAT);
  }

  @Input()
  set disableRipple(val: any) {
    this._disableRipple = coerceBooleanProperty(val);
  }
  get disableRipple(): boolean {
    return this._disableRipple;
  }
  _disableRipple: boolean = false;

  @HostBinding('class.ngx-mat-number-spinner-disabled')
  private get _classDisabled(): boolean {
    return this._disabled;
  }

  @HostBinding('class.ngx-mat-number-spinner-readonly')
  private get _classReadonly(): boolean {
    return this._readonly;
  }

  mouseDown(sign: NgxMatNumberSpinnerSign) {
    if (this._disabled || this._readonly) {
      return
    }
    this.changed.emit(sign);
    this.startAutoUpdate(sign);
  }

  mouseUp() {
    this.stopAutoUpdate();
  }

}

