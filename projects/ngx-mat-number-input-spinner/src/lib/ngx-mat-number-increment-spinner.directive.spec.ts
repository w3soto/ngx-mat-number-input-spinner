import { NgxMatNumberIncrementSpinner } from './ngx-mat-number-increment-spinner.directive';
import { Component, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";


@Component({
  selector: 'test-component',
  template: `
    <input #testInput>
    <button 
      [ngxMatNumberIncrementSpinnerFor]="testInput" 
      #directive="ngxMatNumberIncrementSpinner">increment</button>
  `
})
class TestComponent {
  @ViewChild('directive', {static: true})
  directive!: NgxMatNumberIncrementSpinner;
}


describe('NgxMatNumberIncrementSpinner', () => {

  let component: TestComponent;
  let directive: NgxMatNumberIncrementSpinner;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        NgxMatNumberIncrementSpinner
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    directive = component.directive;
  });

  it('should increment from 30 to 33', () => {

    const inputEl = fixture.debugElement.nativeElement.querySelector('input');
    const buttonEl = fixture.debugElement.nativeElement.querySelector('button');

    inputEl.setAttribute('value', '30');
    inputEl.setAttribute('step', '3');

    directive.readInputElAttributes();

    buttonEl.dispatchEvent(new Event('mousedown'));
    buttonEl.dispatchEvent(new Event('mouseup'));

    expect(inputEl.value).toEqual('33')

  });

  it('should increment from 1.22 to 1.25', () => {
    const inputEl = fixture.debugElement.nativeElement.querySelector('input');
    const buttonEl = fixture.debugElement.nativeElement.querySelector('button');

    inputEl.setAttribute('value', '1.22');
    inputEl.setAttribute('step', '.03');
    directive.readInputElAttributes();

    buttonEl.dispatchEvent(new Event('mousedown'));
    buttonEl.dispatchEvent(new Event('mouseup'));
    fixture.detectChanges();

    expect(inputEl.value).toEqual('1.25')
  });

  it('should increment 5 times, start at value 3 but stop at max value 5', () => {
    const inputEl = fixture.debugElement.nativeElement.querySelector('input');
    const buttonEl = fixture.debugElement.nativeElement.querySelector('button');

    spyOn(directive, 'updateInputEl').and.callThrough();
    spyOn(directive, 'startAutoUpdate').and.callThrough();
    spyOn(directive, 'stopAutoUpdate').and.callThrough();

    inputEl.setAttribute('value', '3');
    inputEl.setAttribute('step', '1');
    inputEl.setAttribute('max', '5');
    directive.readInputElAttributes();
    fixture.detectChanges();

    for (let i=0; i<5; i++) {
      buttonEl.dispatchEvent(new Event('mousedown'));
      buttonEl.dispatchEvent(new Event('mouseup'));
      fixture.detectChanges();
    }

    // check calls
    expect(directive.updateInputEl).toHaveBeenCalledTimes(5);
    expect(directive.startAutoUpdate).toHaveBeenCalledTimes(5);
    expect(directive.stopAutoUpdate).toHaveBeenCalledTimes(10);

    expect(inputEl.value).toEqual('5')
  });

  it('should disable then enable', () => {
    const inputEl = fixture.debugElement.nativeElement.querySelector('input');
    const buttonEl = fixture.debugElement.nativeElement.querySelector('button');

    inputEl.setAttribute("disabled", "disabled");
    directive.readInputElAttributes();
    fixture.detectChanges();

    expect(directive.disabled).toEqual(true);
    expect(buttonEl.hasAttribute("disabled")).toEqual(true);

    inputEl.removeAttribute("disabled");
    directive.readInputElAttributes();
    fixture.detectChanges();

    expect(directive.disabled).toEqual(false)
    expect(buttonEl.hasAttribute("disabled")).toEqual(false)

  });

  it('should cleanup', () => {

    spyOn(directive, 'disconnectInputEl').and.callThrough();
    spyOn(directive, 'stopAutoUpdate').and.callThrough();

    directive.ngOnDestroy();

    expect(directive.stopAutoUpdate).toHaveBeenCalled();
    expect(directive.disconnectInputEl).toHaveBeenCalled();
  });

});
