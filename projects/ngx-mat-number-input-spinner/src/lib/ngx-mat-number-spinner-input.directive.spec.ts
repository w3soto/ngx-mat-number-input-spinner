import { NgxMatNumberSpinnerInput } from './ngx-mat-number-spinner-input.directive';
import { Component, Input, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";


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
      ngxMatNumberSpinner>
  `
})
class TestComponent {
  @ViewChild(NgxMatNumberSpinnerInput, {static: true})
  directive!: NgxMatNumberSpinnerInput;
  @Input()
  value: number = 0;
  @Input()
  step: any = 1;
  @Input()
  min: number | null = null;
  @Input()
  max: number | null = null;
  @Input()
  disabled: boolean = false;
  @Input()
  readonly: boolean = false;
}


describe('NgxMatNumberSpinnerInput', () => {

  let component: TestComponent;
  let directive: NgxMatNumberSpinnerInput;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        NgxMatNumberSpinnerInput
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
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should read step value', () => {
    component.step = 123;
    fixture.detectChanges();
    expect(directive.step).toEqual(123);
  });

  it('should read step value as 1 if not defined', () => {
    component.step = null;
    fixture.detectChanges();
    expect(directive.step).toEqual(1);
  });

  it('should read step value as 1 if not negative', () => {
    component.step = -123;
    fixture.detectChanges();
    expect(directive.step).toEqual(1);
  });

  it('should read min value', () => {
    component.min = 123;
    fixture.detectChanges();
    expect(directive.min).toEqual(123);
  });

  it('should read max value', () => {
    component.max = 123;
    fixture.detectChanges();
    expect(directive.max).toEqual(123);
  });

  it('should read disabled value', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(directive.disabled).toEqual(true);
  });

  it('should read readonly value', () => {
    component.readonly = true;
    fixture.detectChanges();
    expect(directive.readonly).toEqual(true);
  });

  it('should calculate precision as 0', () => {
    component.step = 1;
    fixture.detectChanges();
    expect((directive as any)._precision).toEqual(0);
  });

  it('should calculate precision as 1', () => {
    component.step = .2;
    fixture.detectChanges();
    expect((directive as any)._precision).toEqual(1);
  });

  it('should calculate precision as 2', () => {
    component.step = 1.25;
    fixture.detectChanges();
    expect((directive as any)._precision).toEqual(2);
  });

  it('should emit input event', () => {
    spyOn((directive as any)._inputEl.nativeElement, 'dispatchEvent');

    (directive as any)._updateInputEl(1);

    expect((directive as any)._inputEl.nativeElement.dispatchEvent).toHaveBeenCalledWith(new Event('input'));
    expect((directive as any)._inputEl.nativeElement.dispatchEvent).toHaveBeenCalledWith(new Event('change'));
  });

  it('should not emit input if disabled', () => {
    component.disabled = true;
    fixture.detectChanges();

    spyOn((directive as any)._inputEl.nativeElement, 'dispatchEvent');

    (directive as any)._updateInputEl(1);

    expect((directive as any)._inputEl.nativeElement.dispatchEvent).not.toHaveBeenCalled();
  });

  it('should not emit input if readonly', () => {
    component.readonly = true;
    fixture.detectChanges();

    spyOn((directive as any)._inputEl.nativeElement, 'dispatchEvent');

    (directive as any)._updateInputEl(1);

    expect((directive as any)._inputEl.nativeElement.dispatchEvent).not.toHaveBeenCalled();
  });

});
