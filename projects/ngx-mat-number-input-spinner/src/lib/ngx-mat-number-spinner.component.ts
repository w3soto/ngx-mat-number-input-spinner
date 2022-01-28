import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { _NgxMatNumberSpinnerBase, NgxMatNumberSpinnerSign } from "./ngx-mat-number-spinner-base.directive";


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

  @Input('for')
  set inputEl(el: HTMLInputElement) {
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

