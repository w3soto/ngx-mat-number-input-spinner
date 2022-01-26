import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatNumberInputSpinnerComponent } from './ngx-mat-number-input-spinner.component';

describe('NgxMatNumberInputSpinnerComponent', () => {
  let component: NgxMatNumberInputSpinnerComponent;
  let fixture: ComponentFixture<NgxMatNumberInputSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMatNumberInputSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatNumberInputSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
