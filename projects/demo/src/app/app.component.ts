import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  numberValue: number | null = null;

  disabled: boolean = false;
  readonly: boolean = false;

  constructor() {
  }

}
