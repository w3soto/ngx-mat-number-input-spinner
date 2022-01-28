import { ChangeDetectorRef, Directive, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';
import { _NgxMatNumberSpinnerBase } from "./ngx-mat-number-spinner-base.directive";


@Directive({
  selector: '[ngxMatNumberDecrementSpinnerFor]',
  exportAs: 'ngxMatNumberDecrementSpinner'
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
