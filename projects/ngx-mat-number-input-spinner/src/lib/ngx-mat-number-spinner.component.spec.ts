import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatNumberSpinner } from './ngx-mat-number-spinner.component';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatRippleModule } from "@angular/material/core";
import { Component, ViewChild } from "@angular/core";


@Component({
  selector: 'test-component',
  template: `
    <input #testInput>
    <ngx-mat-number-spinner [for]="testInput" #spinner="ngxMatNumberSpinner"></ngx-mat-number-spinner>
  `
})
class TestComponent {
  @ViewChild('spinner', {static: true})
  spinner!: NgxMatNumberSpinner;
}


describe('NgxMatNumberSpinner', () => {
  let component: TestComponent;
  let spinner: NgxMatNumberSpinner;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        NgxMatNumberSpinner
      ],
      imports: [
        NoopAnimationsModule,
        MatRippleModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    spinner = component.spinner;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(spinner).toBeTruthy();
  });

  it('should increment from 30 to 33', () => {

    const inputEl = fixture.debugElement.nativeElement.querySelector('input');
    const incButtonEl = fixture.debugElement.nativeElement.querySelector('.ngx-mat-number-spinner-button--inc');

    inputEl.setAttribute('value', '30');
    inputEl.setAttribute('step', '3');

    spinner.readInputElAttributes();

    incButtonEl.dispatchEvent(new Event('mousedown'));
    incButtonEl.dispatchEvent(new Event('mouseup'));

    expect(inputEl.value).toEqual('33')

  });

  it('should increment from 1.22 to 1.25', () => {
    const inputEl = fixture.debugElement.nativeElement.querySelector('input');
    const incButtonEl = fixture.debugElement.nativeElement.querySelector('.ngx-mat-number-spinner-button--inc');

    inputEl.setAttribute('value', '1.22');
    inputEl.setAttribute('step', '.03');
    spinner.readInputElAttributes();

    incButtonEl.dispatchEvent(new Event('mousedown'));
    incButtonEl.dispatchEvent(new Event('mouseup'));
    fixture.detectChanges();

    expect(inputEl.value).toEqual('1.25')
  });

  it('should increment 10 times, start at value 3.55, stop at max value 7, step 0.55', () => {
    const inputEl = fixture.debugElement.nativeElement.querySelector('input');
    const buttonEl = fixture.debugElement.nativeElement.querySelector('.ngx-mat-number-spinner-button--inc');

    spyOn(spinner, 'updateInputEl').and.callThrough();
    spyOn(spinner, 'startAutoUpdate').and.callThrough();
    spyOn(spinner, 'stopAutoUpdate').and.callThrough();

    inputEl.setAttribute('value', '3.55');
    inputEl.setAttribute('step', '.55');
    inputEl.setAttribute('max', '7.2');
    spinner.readInputElAttributes();
    fixture.detectChanges();

    for (let i=0; i<10; i++) {
      buttonEl.dispatchEvent(new Event('mousedown'));
      buttonEl.dispatchEvent(new Event('mouseup'));
      fixture.detectChanges();
    }

    // check calls
    expect(spinner.updateInputEl).toHaveBeenCalledTimes(10);
    expect(spinner.startAutoUpdate).toHaveBeenCalledTimes(10);
    expect(spinner.stopAutoUpdate).toHaveBeenCalledTimes(20);

    expect(inputEl.value).toEqual('7.2')
  });

  it('should decrement from 33 to 30', () => {

    const inputEl = fixture.debugElement.nativeElement.querySelector('input');
    const decButtonEl = fixture.debugElement.nativeElement.querySelector('.ngx-mat-number-spinner-button--dec');

    inputEl.setAttribute('value', '33');
    inputEl.setAttribute('step', '3');

    spinner.readInputElAttributes();

    decButtonEl.dispatchEvent(new Event('mousedown'));
    decButtonEl.dispatchEvent(new Event('mouseup'));

    expect(inputEl.value).toEqual('30')

  });

  it('should decrement from 1.25 to 1.22', () => {
    const inputEl = fixture.debugElement.nativeElement.querySelector('input');
    const decButtonEl = fixture.debugElement.nativeElement.querySelector('.ngx-mat-number-spinner-button--dec');

    inputEl.setAttribute('value', '1.25');
    inputEl.setAttribute('step', '.03');
    spinner.readInputElAttributes();

    decButtonEl.dispatchEvent(new Event('mousedown'));
    decButtonEl.dispatchEvent(new Event('mouseup'));
    fixture.detectChanges();

    expect(inputEl.value).toEqual('1.22')
  });

  it('should decrement 10 times, start at value 2.66, stop at min value 2.1, step .2', () => {
    const inputEl = fixture.debugElement.nativeElement.querySelector('input');
    const buttonEl = fixture.debugElement.nativeElement.querySelector('.ngx-mat-number-spinner-button--dec');

    spyOn(spinner, 'updateInputEl').and.callThrough();
    spyOn(spinner, 'startAutoUpdate').and.callThrough();
    spyOn(spinner, 'stopAutoUpdate').and.callThrough();

    inputEl.setAttribute('value', '2.66');
    inputEl.setAttribute('step', '.2');
    inputEl.setAttribute('min', '2.10');
    spinner.readInputElAttributes();
    fixture.detectChanges();

    for (let i=0; i<10; i++) {
      buttonEl.dispatchEvent(new Event('mousedown'));
      buttonEl.dispatchEvent(new Event('mouseup'));
      fixture.detectChanges();
    }

    // check calls
    expect(spinner.updateInputEl).toHaveBeenCalledTimes(10);
    expect(spinner.startAutoUpdate).toHaveBeenCalledTimes(10);
    expect(spinner.stopAutoUpdate).toHaveBeenCalledTimes(20);

    expect(inputEl.value).toEqual('2.1')
  });

  it('should disable then enable', () => {
    const inputEl = fixture.debugElement.nativeElement.querySelector('input');
    const incButtonEl = fixture.debugElement.nativeElement.querySelector('.ngx-mat-number-spinner-button--inc');
    const decButtonEl = fixture.debugElement.nativeElement.querySelector('.ngx-mat-number-spinner-button--dec');

    inputEl.setAttribute("disabled", "disabled");
    spinner.readInputElAttributes();
    fixture.detectChanges();

    expect(spinner.disabled).toEqual(true);
    expect(incButtonEl.hasAttribute("disabled")).toEqual(true);
    expect(decButtonEl.hasAttribute("disabled")).toEqual(true);

    inputEl.removeAttribute("disabled");
    spinner.readInputElAttributes();
    fixture.detectChanges();

    expect(spinner.disabled).toEqual(false)
    expect(incButtonEl.hasAttribute("disabled")).toEqual(false)
    expect(decButtonEl.hasAttribute("disabled")).toEqual(false)

  });

  it('should read default input values', () => {
    const inputEl = fixture.debugElement.nativeElement.querySelector('input');
    // defaults
    inputEl.removeAttribute('step');
    inputEl.removeAttribute('min');
    inputEl.removeAttribute('max');
    inputEl.removeAttribute('disabled');
    spinner.readInputElAttributes();
    // @ts-ignore
    expect(spinner._step).toEqual(1);
    // @ts-ignore
    expect(spinner._precision).toEqual(0);
    // @ts-ignore
    expect(spinner._min).toEqual(null);
    // @ts-ignore
    expect(spinner._max).toEqual(null);
  });

  it('should calculate precision as 0', () => {
    const inputEl = fixture.debugElement.nativeElement.querySelector('input');
    inputEl.setAttribute('step', '1');
    spinner.readInputElAttributes();
    // @ts-ignore
    expect(spinner._precision).toEqual(0);
  });

  it('should calculate precision as 1', () => {
    const inputEl = fixture.debugElement.nativeElement.querySelector('input');
    inputEl.setAttribute('step', '.5');
    spinner.readInputElAttributes();
    // @ts-ignore
    expect(spinner._precision).toEqual(1);

    inputEl.setAttribute('step', '0.5');
    spinner.readInputElAttributes();
    // @ts-ignore
    expect(spinner._precision).toEqual(1);

    inputEl.setAttribute('step', '2.5');
    spinner.readInputElAttributes();
    // @ts-ignore
    expect(spinner._precision).toEqual(1);
  });

  it('should calculate precision as 2', () => {
    const inputEl = fixture.debugElement.nativeElement.querySelector('input');
    inputEl.setAttribute('step', '.53');
    spinner.readInputElAttributes();
    // @ts-ignore
    expect(spinner._precision).toEqual(2);

    inputEl.setAttribute('step', '0.53');
    spinner.readInputElAttributes();
    // @ts-ignore
    expect(spinner._precision).toEqual(2);

    inputEl.setAttribute('step', '2.53');
    spinner.readInputElAttributes();
    // @ts-ignore
    expect(spinner._precision).toEqual(2);
  });

  it('should read step/min/max/disabled values', () => {
    const inputEl = fixture.debugElement.nativeElement.querySelector('input');
    // defaults
    inputEl.setAttribute('step', '33');
    inputEl.setAttribute('min', '99');
    inputEl.setAttribute('max', '999');
    inputEl.setAttribute('disabled', 'disabled');
    spinner.readInputElAttributes();
    // @ts-ignore
    expect(spinner._step).toEqual(33);
    // @ts-ignore
    expect(spinner._min).toEqual(99);
    // @ts-ignore
    expect(spinner._max).toEqual(999);
    // @ts-ignore
    expect(spinner._disabled).toEqual(true);
  });

  it('should cleanup', () => {

    spyOn(spinner, 'disconnectInputEl').and.callThrough();
    spyOn(spinner, 'stopAutoUpdate').and.callThrough();

    spinner.ngOnDestroy();

    expect(spinner.stopAutoUpdate).toHaveBeenCalled();
    expect(spinner.disconnectInputEl).toHaveBeenCalled();
  });

});
