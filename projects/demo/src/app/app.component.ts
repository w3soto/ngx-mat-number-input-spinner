import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  numberStandardValue: number | null = null;

  numberClassicValue: number | null = null;

  numberCustomValue: number | null = null;

  constructor() {
  }

}
