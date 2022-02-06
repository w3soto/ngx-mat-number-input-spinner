import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxMatNumberInputSpinnerModule } from "../../../ngx-mat-number-input-spinner/src/lib/ngx-mat-number-spinner.module";
import { MatInputModule } from "@angular/material/input";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        NoopAnimationsModule,
        FormsModule,

        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatSlideToggleModule,

        NgxMatNumberInputSpinnerModule
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
