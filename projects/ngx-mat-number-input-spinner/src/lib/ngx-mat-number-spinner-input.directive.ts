import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty, NumberInput } from "@angular/cdk/coercion";
import { Subject } from "rxjs";
import { takeUntil, tap } from "rxjs/operators";

import { _NgxMatNumberSpinnerBase, NgxMatNumberSpinnerSign } from "./ngx-mat-number-spinner-base.directive";


@Directive({
  selector: 'input[ngxMatNumberSpinner]',
  exportAs: 'ngxMatNumberSpinnerInput',
  host: {
    'class': 'ngx-mat-number-spinner-input '
  }
})
export class NgxMatNumberSpinnerInput implements OnDestroy {

  @Input('ngxMatNumberSpinner')
  set spinners(spinners: _NgxMatNumberSpinnerBase | _NgxMatNumberSpinnerBase[]) {
    if (Array.isArray(spinners)) {
      this._spinners = spinners;
    }
    else if (spinners) {
      this._spinners = [spinners];
    }
    else {
      this.spinners = [];
    }
    this._connectSpinners();
  }
  private _spinners: _NgxMatNumberSpinnerBase[] = [];

  @Input()
  set min(val: NumberInput) {
    this._min = coerceNumberProperty(val, null);
  }
  get min(): number | null {
    return this._min;
  }
  private _min: number | null = null;

  @Input()
  set max(val: NumberInput) {
    this._max = coerceNumberProperty(val, null);
  }
  get max(): number | null {
    return this._max;
  }
  private _max: number | null = null;

  @Input()
  set step(val: NumberInput) {
    this._step = coerceNumberProperty(val, 1);
    if (this._step <= 0) {
      this._step = 1;
    }
    this._precision = this._calculatePrecision(this._step);
  }
  get step(): number {
    return this._step;
  }
  private _step: number = 1;

  @Input()
  set disabled(val: any) {
    this._disabled = coerceBooleanProperty(val);
    this._spinners.forEach(spinner => {
      spinner.disabled = this._disabled;
    });
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled: boolean = false;

  @Input()
  set readonly(val: any) {
    this._readonly = coerceBooleanProperty(val);
    this._spinners.forEach(spinner => {
      spinner.readonly = this._readonly;
    });
  }
  get readonly(): boolean {
    return this._readonly;
  }
  private _readonly: boolean = false;

  private _precision: number = 0;

  private _destroyed: Subject<void> = new Subject();

  constructor(
    private _inputEl: ElementRef<HTMLInputElement>
  ) {}

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  private _connectSpinners() {
    this._spinners.forEach(spinner => {
      spinner.changed.pipe(
        tap(sign => this._updateInputEl(sign)),
        takeUntil(this._destroyed)
      ).subscribe();
    })
  }

  private _calculatePrecision(step: number): number {
    let precision = 0;
    const decimalIndex = ('' + step).indexOf('.');
    if (decimalIndex > -1) {
      precision = ('' + step).length - decimalIndex - 1;
    }
    return precision;
  }

  private _updateInputEl(sign: NgxMatNumberSpinnerSign) {
    if (this._disabled || this._readonly) {
      return;
    }
    let value = sign * this._step + coerceNumberProperty(this._inputEl.nativeElement.value, 0);
    if (this._min != null && value < this._min) {
      value = this._min;
    }
    if (this._max != null && value > this._max) {
      value = this._max;
    }
    this._inputEl.nativeElement.value = '' + parseFloat(value.toFixed(this._precision));
    this._inputEl.nativeElement.dispatchEvent(new Event('input'));
    this._inputEl.nativeElement.dispatchEvent(new Event('change'));
  }

}
