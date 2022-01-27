import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";


export type NgxMatNumberSpinnerSign = -1 | 1;


@Directive({})
class _NgxMatNumberSpinnerBase implements OnDestroy {

  protected _inputEl!: HTMLInputElement;

  protected _step: number = 1;
  protected _precision: number = 0;
  protected _min: number | null = null;
  protected _max: number | null = null;
  protected _disabled: boolean = false;

  protected _autoDelay: number = 500;
  protected _autoRepeat: number = 25;

  private _autoTimeout: any;
  private _autoInterval: any;

  readonly _mutationObserver!: MutationObserver;

  constructor(
    protected _renderer: Renderer2,
    protected _cdr: ChangeDetectorRef
  ) {
    this._mutationObserver = new MutationObserver(mutations => {
      this.readInputElAttributes();
    });
  }

  ngOnDestroy(): void {
    this.stopAutoUpdate();
    this.disconnectInputEl();
  }

  connectInputEl() {
    if (this._inputEl) {
      this._renderer.addClass(this._inputEl, 'ngx-mat-number-spinner-input');
      if (this._mutationObserver) {
        this._mutationObserver.observe(this._inputEl, {attributeFilter: ['min', 'max', 'step', 'disabled']});
      }
    }
  }

  disconnectInputEl() {
    if (this._inputEl) {
      this._renderer.removeClass(this._inputEl, 'ngx-mat-number-spinner-input');
      if (this._mutationObserver) {
        this._mutationObserver.disconnect();
      }
    }
    // reset values
    this._step = 1;
    this._precision = 0;
    this._min = null;
    this._max = null;
    this._disabled = false;
  }

  updateInputEl(sign: NgxMatNumberSpinnerSign) {
    if (this._disabled) {
      return;
    }
    let value = sign * this._step + coerceNumberProperty(this._inputEl.value, 0);
    if (this._min != null && value < this._min) {
      value = this._min;
    }
    if (this._max != null && value > this._max) {
      value = this._max;
    }
    this._inputEl.value = value.toFixed(this._precision);
    this._inputEl.dispatchEvent(new Event('change'));
    this._inputEl.dispatchEvent(new Event('input'));
  }

  readInputElAttributes() {
    this._step = coerceNumberProperty(this._inputEl.getAttribute('step'), 1);
    if (this._step <= 0) {
      this._step = 1;
    }
    if (this._step < 1) {
      this._precision = ('' + this._step).indexOf('.') + 1; // get number of digits after decimal point
    }
    this._min = coerceNumberProperty(this._inputEl.getAttribute('min'), null);
    this._max = coerceNumberProperty(this._inputEl.getAttribute('max'), null);
    this._disabled = coerceBooleanProperty(this._inputEl.getAttribute('disabled'));

    this._cdr.markForCheck();
  }

  startAutoUpdate(sign: NgxMatNumberSpinnerSign) {
    if (this._disabled) {
      return;
    }
    this.stopAutoUpdate();
    this._autoTimeout = setTimeout( () => {
      this._autoInterval = setInterval( () => {
        this.updateInputEl(sign);
      }, this._autoRepeat);
    }, this._autoDelay);
  }

  stopAutoUpdate() {
    clearTimeout(this._autoTimeout);
    clearInterval(this._autoInterval);
  }

}


@Directive({
  selector: '[ngxMatNumberIncrementSpinnerFor]'
})
export class NgxMatNumberIncrementSpinner extends _NgxMatNumberSpinnerBase {

  @Input('ngxMatNumberIncrementSpinnerFor')
  set inputEl(el: HTMLInputElement) {
    this.disconnectInputEl();
    this._inputEl = el;
    this.connectInputEl();
  }

  @Input('ngxMatNumberIncrementSpinnerAutoDelay')
  set autoDelay(autoDelay: number) {
    this._autoDelay = autoDelay;
  }

  @Input('ngxMatNumberIncrementSpinnerAutoRepeat')
  set autoRepeat(autoRepeat: number) {
    this._autoRepeat = autoRepeat;
  }

  @HostListener('mousedown')
  mouseDown() {
    this.updateInputEl(1);
    this.startAutoUpdate(1);
  }

  @HostListener('mouseup')
  mouseUp() {
    this.stopAutoUpdate();
  }

  @HostBinding('disabled')
  get disabled(): boolean {
    return this._disabled;
  }

  constructor(_renderer: Renderer2,_cdr: ChangeDetectorRef) {
    super(_renderer, _cdr);
  }

}


@Directive({
  selector: '[ngxMatNumberDecrementSpinnerFor]'
})
export class NgxMatNumberDecrementSpinner extends _NgxMatNumberSpinnerBase {

  @Input('ngxMatNumberDecrementSpinnerFor')
  set inputEl(el: HTMLInputElement) {
    this.disconnectInputEl();
    this._inputEl = el;
    this.connectInputEl();
  }

  @Input('ngxMatNumberDecrementSpinnerAutoDelay')
  set autoDelay(autoDelay: number) {
    this._autoDelay = autoDelay;
  }

  @Input('ngxMatNumberDecrementSpinnerAutoRepeat')
  set autoRepeat(autoRepeat: number) {
    this._autoRepeat = autoRepeat;
  }

  @HostListener('mousedown')
  mouseDown() {
    this.updateInputEl(-1);
    this.startAutoUpdate(-1);
  }

  @HostListener('mouseup')
  mouseUp() {
    this.stopAutoUpdate();
  }

  @HostBinding('disabled')
  get disabled(): boolean {
    return this._disabled;
  }

  constructor(_renderer: Renderer2,_cdr: ChangeDetectorRef) {
    super(_renderer, _cdr);
  }

}


@Component({
  selector: 'ngx-mat-number-spinner',
  templateUrl: './ngx-mat-number-spinner.component.html',
  styleUrls: ['./ngx-mat-number-spinner.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'ngx-mat-number-spinner'
  }
})
export class NgxMatNumberSpinner extends _NgxMatNumberSpinnerBase {

  @Input()
  set for(el: HTMLInputElement) {
    this.disconnectInputEl();
    this._inputEl = el;
    this.connectInputEl();
  }

  @Input()
  set autoDelay(autoDelay: number) {
    this._autoDelay = autoDelay;
  }

  @Input()
  set autoRepeat(autoRepeat: number) {
    this._autoRepeat = autoRepeat;
  }

  get disabled(): boolean {
    return this._disabled;
  }

  constructor(_renderer: Renderer2,_cdr: ChangeDetectorRef) {
    super(_renderer, _cdr);
  }

  mouseDown(sign: NgxMatNumberSpinnerSign) {
    this.updateInputEl(sign);
    this.startAutoUpdate(sign);
  }

  mouseUp() {
    this.stopAutoUpdate();
  }

}
