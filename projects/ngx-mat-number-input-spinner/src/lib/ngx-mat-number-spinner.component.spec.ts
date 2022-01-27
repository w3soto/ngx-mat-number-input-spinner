import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatNumberSpinner } from './ngx-mat-number-spinner.component';

describe('NgxMatNumberSpinner', () => {
  let component: NgxMatNumberSpinner;
  let fixture: ComponentFixture<NgxMatNumberSpinner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMatNumberSpinner ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatNumberSpinner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
