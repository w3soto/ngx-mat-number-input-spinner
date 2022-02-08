import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { NgxMatNumberSpinner } from './ngx-mat-number-spinner.component';
import { Component, Input, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgxMatNumberSpinnerInput } from "./ngx-mat-number-spinner-input.directive";
import { MatRippleModule } from "@angular/material/core";


@Component({
  selector: 'test-component',
  template: `
    <input
      [step]="step" 
      [min]="min"
      [max]="max"
      [disabled]="disabled"
      [readonly]="readonly"
      [(ngModel)]="value"
      [ngxMatNumberSpinner]="spinner">
      
    <ngx-mat-number-spinner #spinner></ngx-mat-number-spinner>
  `
})
class TestComponent {
  @ViewChild(NgxMatNumberSpinner, {static: true})
  spinner!: NgxMatNumberSpinner;
  @Input()
  value: number = 0;
  @Input()
  step: number = 1;
  @Input()
  min: number | null = null;
  @Input()
  max: number | null = null;
  @Input()
  disabled: boolean = false;
  @Input()
  readonly: boolean = false;
}


describe('NgxMatNumberSpinner', () => {
  let component: TestComponent;
  let spinner: NgxMatNumberSpinner;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        NgxMatNumberSpinnerInput,
        NgxMatNumberSpinner
      ],
      imports: [
        MatRippleModule,
        FormsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    component = fixture.componentInstance;
    component.value = 0;
    component.step = 1;
    component.min = null;
    component.max = null;

    spinner = component.spinner;
    spyOn(spinner, 'startAutoUpdate').and.callThrough();
    spyOn(spinner, 'stopAutoUpdate').and.callThrough();
    spyOn(spinner.changed, 'emit').and.callThrough();
  });

  it('should create', () => {
    expect(spinner).toBeTruthy();
  });

  it('should cleanup', () => {
    spinner.ngOnDestroy();
    expect(spinner.stopAutoUpdate).toHaveBeenCalled();
  });

  it('should set disabled', fakeAsync(() => {

    const spinnerEl = fixture.debugElement.nativeElement.querySelector('.ngx-mat-number-spinner');
    const incButtonEl = fixture.debugElement.nativeElement.querySelector('.ngx-mat-number-spinner-button-inc');
    const decButtonEl = fixture.debugElement.nativeElement.querySelector('.ngx-mat-number-spinner-button-dec');

    component.disabled = true;
    fixture.detectChanges();

    tick(100);

    incButtonEl.dispatchEvent(new Event('mousedown'));
    incButtonEl.dispatchEvent(new Event('mouseup'));
    decButtonEl.dispatchEvent(new Event('mousedown'));
    decButtonEl.dispatchEvent(new Event('mouseup'));
    fixture.detectChanges();

    tick(100);

    expect(spinner.disabled).toEqual(true);

    expect(spinnerEl.classList.contains('ngx-mat-number-spinner-disabled')).toEqual(true);
    expect(incButtonEl.hasAttribute("disabled")).toEqual(true);
    expect(incButtonEl.classList.contains('ngx-mat-number-spinner-button-disabled')).toEqual(true);
    expect(decButtonEl.hasAttribute("disabled")).toEqual(true);
    expect(decButtonEl.classList.contains('ngx-mat-number-spinner-button-disabled')).toEqual(true);

    expect(spinner.changed.emit).not.toHaveBeenCalled();
    expect(spinner.startAutoUpdate).not.toHaveBeenCalled();

    flush();
  }));

  it('should set readonly', fakeAsync(() => {

    const spinnerEl = fixture.debugElement.nativeElement.querySelector('.ngx-mat-number-spinner');
    const incButtonEl = fixture.debugElement.nativeElement.querySelector('.ngx-mat-number-spinner-button-inc');
    const decButtonEl = fixture.debugElement.nativeElement.querySelector('.ngx-mat-number-spinner-button-dec');

    component.readonly = true;
    fixture.detectChanges();

    tick(100);

    incButtonEl.dispatchEvent(new Event('mousedown'));
    incButtonEl.dispatchEvent(new Event('mouseup'));
    decButtonEl.dispatchEvent(new Event('mousedown'));
    decButtonEl.dispatchEvent(new Event('mouseup'));
    fixture.detectChanges();

    tick(100);

    expect(spinner.readonly).toEqual(true);

    expect(spinnerEl.classList.contains('ngx-mat-number-spinner-readonly')).toEqual(true);
    expect(incButtonEl.classList.contains('ngx-mat-number-spinner-button-readonly')).toEqual(true);
    expect(decButtonEl.classList.contains('ngx-mat-number-spinner-button-readonly')).toEqual(true);

    expect(spinner.changed.emit).not.toHaveBeenCalled();
    expect(spinner.startAutoUpdate).not.toHaveBeenCalled();

    flush();
  }));

  //
  // INCREMENT
  //
  it('should increment from 30 to 33', fakeAsync(() => {
    component.value = 30;
    component.step = 3;
    fixture.detectChanges();

    tick(100);

    const buttonEl = fixture.debugElement.nativeElement.querySelector('.ngx-mat-number-spinner-button-inc');
    buttonEl.dispatchEvent(new Event('mousedown'));
    buttonEl.dispatchEvent(new Event('mouseup'));
    fixture.detectChanges();

    expect('' + component.value).toEqual('33');

    flush();
  }));

  it('should increment from 1.22 to 1.25', fakeAsync(() => {
    component.value = 1.22;
    component.step = .03;
    fixture.detectChanges();

    tick(100);

    const buttonEl = fixture.debugElement.nativeElement.querySelector('.ngx-mat-number-spinner-button-inc');
    buttonEl.dispatchEvent(new Event('mousedown'));
    buttonEl.dispatchEvent(new Event('mouseup'));
    fixture.detectChanges();

    expect('' + component.value).toEqual('1.25');

    flush();
  }));

  it('should run auto increment', fakeAsync(() => {
    component.value = 0;
    component.step = 1;
    component.max = 20;
    fixture.detectChanges();

    tick(100);

    const buttonEl = fixture.debugElement.nativeElement.querySelector('.ngx-mat-number-spinner-button-inc');
    buttonEl.dispatchEvent(new Event('mousedown'));
    fixture.detectChanges();
    tick(2000); // delay 500 + interval 20*25 ... result cca 60 ?
    buttonEl.dispatchEvent(new Event('mouseup'));
    fixture.detectChanges();

    tick(100);

    // check calls
    expect(spinner.startAutoUpdate).toHaveBeenCalledTimes(1);
    expect(spinner.stopAutoUpdate).toHaveBeenCalledTimes(2);

    expect('' + component.value).toEqual('20');

    flush();
  }));

  //
  // DECREMENT
  //
  it('should decrement from 33 to 30', fakeAsync(() => {
    component.value = 33;
    component.step = 3;
    fixture.detectChanges();

    tick(100);

    const buttonEl = fixture.debugElement.nativeElement.querySelector('.ngx-mat-number-spinner-button-dec');
    buttonEl.dispatchEvent(new Event('mousedown'));
    buttonEl.dispatchEvent(new Event('mouseup'));
    fixture.detectChanges();

    expect('' + component.value).toEqual('30');

    flush();
  }));

  it('should decrement from 1.25 to 1.22', fakeAsync(() => {
    component.value = 1.25;
    component.step = .03;
    fixture.detectChanges();

    tick(100);

    const buttonEl = fixture.debugElement.nativeElement.querySelector('.ngx-mat-number-spinner-button-dec');
    buttonEl.dispatchEvent(new Event('mousedown'));
    buttonEl.dispatchEvent(new Event('mouseup'));
    fixture.detectChanges();

    expect('' + component.value).toEqual('1.22');

    flush();
  }));

  it('should run auto decrement', fakeAsync(() => {
    component.value = 20;
    component.step = 1;
    component.min = 0;
    fixture.detectChanges();

    tick(100);

    const buttonEl = fixture.debugElement.nativeElement.querySelector('.ngx-mat-number-spinner-button-dec');
    buttonEl.dispatchEvent(new Event('mousedown'));
    fixture.detectChanges();
    tick(2000); // delay 500 + interval 20*25 ... result cca 60 ?
    buttonEl.dispatchEvent(new Event('mouseup'));
    fixture.detectChanges();

    tick(100);

    // check calls
    expect(spinner.startAutoUpdate).toHaveBeenCalledTimes(1);
    expect(spinner.stopAutoUpdate).toHaveBeenCalledTimes(2);

    expect('' + component.value).toEqual('0');

    flush();
  }));

});
