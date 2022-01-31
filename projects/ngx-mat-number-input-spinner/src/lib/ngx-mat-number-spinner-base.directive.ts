import { ChangeDetectorRef, Directive, EventEmitter, OnDestroy, Output } from "@angular/core";
import { coerceBooleanProperty } from "@angular/cdk/coercion";


export type NgxMatNumberSpinnerSign = -1 | 1;

export const NGX_MAT_NUMBER_SPINNER_AUTO_DELAY = 500;

export const NGX_MAT_NUMBER_SPINNER_AUTO_REPEAT = 25;


@Directive({})
export class _NgxMatNumberSpinnerBase implements OnDestroy {

  @Output()
  readonly changed: EventEmitter<NgxMatNumberSpinnerSign> = new EventEmitter<NgxMatNumberSpinnerSign>();

  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
    this._cdr.detectChanges();
  }
  get disabled(): boolean {
    return this._disabled;
  }
  protected _disabled: boolean = false;

  protected _autoDelay: number = NGX_MAT_NUMBER_SPINNER_AUTO_DELAY;
  protected _autoRepeat: number = NGX_MAT_NUMBER_SPINNER_AUTO_REPEAT;

  private _autoTimeout: any;
  private _autoInterval: any;

  constructor(
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.stopAutoUpdate();
  }

  setDisabled(disabled: boolean) {
    this._disabled = disabled;
    this._cdr.detectChanges();
  }

  startAutoUpdate(sign: NgxMatNumberSpinnerSign) {
    if (this._disabled) {
      return;
    }
    this.stopAutoUpdate();
    this._autoTimeout = setTimeout( () => {
      this._autoInterval = setInterval( () => {
        this.changed.emit(sign)
      }, this._autoRepeat);
    }, this._autoDelay);
  }

  stopAutoUpdate() {
    clearTimeout(this._autoTimeout);
    clearInterval(this._autoInterval);
  }

}
