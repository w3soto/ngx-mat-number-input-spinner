import { Component, Input, ViewChild } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";

import { NgxMatNumberIncrementSpinner } from './ngx-mat-number-increment-spinner.directive';
import { NgxMatNumberSpinnerInput } from "./ngx-mat-number-spinner-input.directive";


@Component({
  selector: 'test-component',
  template: `
    <input
      [step]="step" 
      [min]="min"
      [max]="max"
      [disabled]="disabled"
      [(ngModel)]="value"
      [ngxMatNumberSpinner]="spinner">
      
    <button 
      ngxMatNumberIncrementSpinner #spinner="ngxMatNumberIncrementSpinner">increment</button>
  `
})
class TestComponent {
  @ViewChild(NgxMatNumberIncrementSpinner, {static: true})
  directive!: NgxMatNumberIncrementSpinner;
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
}


describe('NgxMatNumberIncrementSpinner', () => {

  let component: TestComponent;
  let directive: NgxMatNumberIncrementSpinner;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        NgxMatNumberSpinnerInput,
        NgxMatNumberIncrementSpinner
      ],
      imports: [
        FormsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    directive = component.directive;
    spyOn(directive, 'startAutoUpdate').and.callThrough();
    spyOn(directive, 'stopAutoUpdate').and.callThrough();
  });

  it('should increment from 30 to 33', fakeAsync(() => {
    component.value = 30;
    component.step = 3;
    fixture.detectChanges();

    tick(100);

    const buttonEl = fixture.debugElement.nativeElement.querySelector('button');
    buttonEl.dispatchEvent(new Event('mousedown'));
    buttonEl.dispatchEvent(new Event('mouseup'));
    fixture.detectChanges();

    expect('' + component.value).toEqual('33');
  }));

  it('should increment from 1.22 to 1.25', fakeAsync(() => {
    component.value = 1.22;
    component.step = 0.03;
    fixture.detectChanges();

    tick(100);

    const buttonEl = fixture.debugElement.nativeElement.querySelector('button');
    buttonEl.dispatchEvent(new Event('mousedown'));
    buttonEl.dispatchEvent(new Event('mouseup'));
    fixture.detectChanges();

    expect('' + component.value).toEqual('1.25')

  }));

  it('should increment 5 times, start at value 3, stop at max value 5', fakeAsync(() => {
    component.value = 3;
    component.step = 1;
    component.max = 5;
    fixture.detectChanges();

    tick(100);

    const buttonEl = fixture.debugElement.nativeElement.querySelector('button');
    for (let i=0; i<5; i++) {
      buttonEl.dispatchEvent(new Event('mousedown'));
      buttonEl.dispatchEvent(new Event('mouseup'));
      fixture.detectChanges();
    }

    tick(100);

    // check calls
    expect(directive.startAutoUpdate).toHaveBeenCalledTimes(5);
    expect(directive.stopAutoUpdate).toHaveBeenCalledTimes(10);

    expect('' + component.value).toEqual('5')
  }));

  it('should run auto increment, start at value 0, stop at max value 20', fakeAsync(() => {
    component.value = 0;
    component.step = 1;
    component.max = 20;
    fixture.detectChanges();

    tick(100);

    const buttonEl = fixture.debugElement.nativeElement.querySelector('button');
    buttonEl.dispatchEvent(new Event('mousedown'));
    fixture.detectChanges();
    tick(2000); // delay 500 + interval 20*25
    buttonEl.dispatchEvent(new Event('mouseup'));
    fixture.detectChanges();

    tick(100);

    // check calls
    expect(directive.startAutoUpdate).toHaveBeenCalledTimes(1);
    expect(directive.stopAutoUpdate).toHaveBeenCalledTimes(2);

    expect('' + component.value).toEqual('20')
  }));

  it('should disable then enable', fakeAsync(() => {

    component.disabled = true;
    fixture.detectChanges();

    tick(100);

    const buttonEl = fixture.debugElement.nativeElement.querySelector('button');

    expect(directive.disabled).toEqual(true);
    expect(buttonEl.hasAttribute("disabled")).toEqual(true);

    component.disabled = false;
    fixture.detectChanges();

    expect(directive.disabled).toEqual(false)
    expect(buttonEl.hasAttribute("disabled")).toEqual(false)

  }));

  it('should cleanup', () => {
    directive.ngOnDestroy();

    expect(directive.stopAutoUpdate).toHaveBeenCalled();
  });

});
