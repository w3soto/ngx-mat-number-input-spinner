import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { coerceNumberProperty } from "@angular/cdk/coercion";


export type NgxMatNumberSpinnerSign = -1 | 1;


@Directive({})
class _NgxMatNumberSpinnerBase {

  protected _inputEl!: HTMLInputElement;

  protected _step: number = 1;
  protected _precision: number = 0;
  protected _min: number | null = null;
  protected _max: number | null = null;

  protected _autoDelay: number = 500;
  protected _autoRepeat: number = 25;

  private _autoTimeout: any;
  private _autoInterval: any;

  constructor(
    protected _renderer: Renderer2
  ) {}

  attachInputEl() {
    if (this._inputEl) {
      this._renderer.addClass(this._inputEl, 'ngx-mat-number-spinner-input');
      this._step = coerceNumberProperty(this._inputEl.getAttribute('step'), 1);
      if (this._step <= 0) {
        this._step = 1;
      }
      if (this._step < 1) {
        this._precision = ('' + this._step).length - 2;
      }
      this._min = coerceNumberProperty(this._inputEl.getAttribute('min'), null);
      this._max = coerceNumberProperty(this._inputEl.getAttribute('max'), null);
    }
  }

  detachInputEl() {
    if (this._inputEl) {
      this._renderer.removeClass(this._inputEl, 'ngx-mat-number-spinner-input');
    }
    this._step = 1;
    this._precision = 0;
    this._min = null;
    this._max = null;
  }

  updateInputEl(sign: NgxMatNumberSpinnerSign) {
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

  startAutoUpdate(sign: NgxMatNumberSpinnerSign) {
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
export class NgxMatNumberIncrementSpinner extends _NgxMatNumberSpinnerBase implements OnDestroy {

  @Input('ngxMatNumberIncrementSpinnerFor')
  set inputEl(el: HTMLInputElement) {
    this.detachInputEl();
    this._inputEl = el;
    this.attachInputEl();
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

  constructor(_renderer: Renderer2) {
    super(_renderer);
  }

  ngOnDestroy(): void {
    this.stopAutoUpdate();
    this.detachInputEl();
  }

}


@Directive({
  selector: '[ngxMatNumberDecrementSpinnerFor]'
})
export class NgxMatNumberDecrementSpinner extends _NgxMatNumberSpinnerBase implements OnDestroy {

  @Input('ngxMatNumberDecrementSpinnerFor')
  set inputEl(el: HTMLInputElement) {
    this.detachInputEl();
    this._inputEl = el;
    this.attachInputEl();
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

  constructor(_renderer: Renderer2) {
    super(_renderer);
  }

  ngOnDestroy(): void {
    this.stopAutoUpdate();
    this.detachInputEl();
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
export class NgxMatNumberSpinner extends _NgxMatNumberSpinnerBase implements OnDestroy {

  @Input()
  set for(el: HTMLInputElement) {
    this.detachInputEl();
    this._inputEl = el;
    this.attachInputEl();
  }

  @Input()
  set autoDelay(autoDelay: number) {
    this._autoDelay = autoDelay;
  }

  @Input()
  set autoRepeat(autoRepeat: number) {
    this._autoRepeat = autoRepeat;
  }

  constructor(_renderer: Renderer2) {
    super(_renderer);
  }

  ngOnDestroy(): void {
    this.stopAutoUpdate();
    this.detachInputEl();
  }

  mouseDown(sign: NgxMatNumberSpinnerSign) {
    this.updateInputEl(sign);
    this.startAutoUpdate(sign);
  }

  mouseUp() {
    this.stopAutoUpdate();
  }

}
