import { NgxMatNumberDecrementSpinner } from './ngx-mat-number-decrement-spinner.directive';
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { Component, Input, ViewChild } from "@angular/core";
import { NgxMatNumberSpinnerInput } from "./ngx-mat-number-spinner-input.directive";
import { FormsModule } from "@angular/forms";


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
      ngxMatNumberDecrementSpinner #spinner="ngxMatNumberDecrementSpinner">decrement</button>
  `
})
class TestComponent {
  @ViewChild(NgxMatNumberDecrementSpinner, {static: true})
  directive!: NgxMatNumberDecrementSpinner;
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


describe('NgxMatNumberDecrementSpinner', () => {

  let component: TestComponent;
  let directive: NgxMatNumberDecrementSpinner;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        NgxMatNumberSpinnerInput,
        NgxMatNumberDecrementSpinner
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

  it('should decrement from 33 to 30', fakeAsync(() => {
    component.value = 33;
    component.step = 3;
    fixture.detectChanges();

    tick(100);

    const buttonEl = fixture.debugElement.nativeElement.querySelector('button');
    buttonEl.dispatchEvent(new Event('mousedown'));
    buttonEl.dispatchEvent(new Event('mouseup'));
    fixture.detectChanges();

    expect('' + component.value).toEqual('30');
  }));

  it('should decrement from 1.25 to 1.22', fakeAsync(() => {
    component.value = 1.25;
    component.step = 0.03;
    fixture.detectChanges();

    tick(100);

    const buttonEl = fixture.debugElement.nativeElement.querySelector('button');
    buttonEl.dispatchEvent(new Event('mousedown'));
    buttonEl.dispatchEvent(new Event('mouseup'));
    fixture.detectChanges();

    expect('' + component.value).toEqual('1.22')

  }));

  it('should decrement 5 times, start at value 5, stop at max value 3', fakeAsync(() => {
    component.value = 5;
    component.step = 1;
    component.min = 3;
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

    expect('' + component.value).toEqual('3')
  }));

  it('should run auto decrement, start at value 20, stop at min value 0', fakeAsync(() => {
    component.value = 20;
    component.step = 1;
    component.min = 0;
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

    expect('' + component.value).toEqual('0')
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
