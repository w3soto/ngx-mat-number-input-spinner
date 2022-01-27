# NgxMatNumberInputSpinner

Number Spinner component for Angular Material

[GitHub](https://github.com/w3soto/ngx-mat-number-input-spinner)

## Features
* Replace default browser spinner 
* Custom buttons (prefix/suffix) for increment and decrement value 
* Read step, min and max properties from input element

![Screenshot](https://raw.githubusercontent.com/w3soto/ngx-mat-number-input-spinner/master/screenshot.png "Screenshot")

## Installation
```shell
npm -i ngx-mat-number-input-spinner
```

## Example

Fro more details see *projects/demo* application

```typescript
import { NgxMatNumberInputSpinnerModule } from "ngx-mat-number-input-spinner";
...

@NgModule({
  imports: [
    ...,
    NgxMatNumberInputSpinnerModule,
  ],
  ...
})
class AppModule { ... }

```

Basic template 
```html
<mat-form-field>
  
  <input
    matInput
    #myNumberInput
    type="number"
    step=".5"
    min="-10"
    max="10"
    [(ngModel)]="myNumberInputValue">

    <ngx-mat-number-spinner
      matSuffix
      [for]="myNumberInput">
    </ngx-mat-number-spinner>
    
</mat-form-field>
```

Custom template 
```html
<mat-form-field>
  
  <input 
    matInput 
    #myCustomInput 
    type="number" 
    min="0" 
    max="5" 
    value="0">
    
  <button 
    mat-icon-button 
    color="primary" 
    matPrefix 
    [ngxMatNumberIncrementSpinnerFor]="myCustomInput">
    <mat-icon>thumb_up</mat-icon>
  </button>
  
  <button 
    mat-icon-button 
    color="warn" 
    matSuffix 
    [ngxMatNumberDecrementSpinnerFor]="myCustomInput">
    <mat-icon>thumb_down</mat-icon>
  </button>
  
</mat-form-field>
```

## Components
 
* **ngx-mat-number-spinner**

| @Input | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| **for** | HTMLInputElement | | HTML input element (required!) |
| **autoDelay** | number | 500 | Delay timeout in milliseconds |
| **autoRepeat** | number | 25 | Repeat interval in milliseconds |

## Directives 

* **ngxMatNumberIncrementSpinnerFor**

| @Input | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| **ngxMatNumberIncrementSpinnerFor** | HTMLInputElement | | HTML input element (required!) |
| **ngxMatNumberIncrementSpinnerAutoDelay** | number | 500 | Delay timeout in milliseconds |
| **ngxMatNumberIncrementSpinnerAutoRepeat** | number | 25 | Repeat interval in milliseconds |

* **ngxMatNumberDecrementSpinnerFor**

| @Input | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| **ngxMatNumberDecrementSpinnerFor** | HTMLInputElement | | HTML input element (required!) |
| **ngxMatNumberDecrementSpinnerAutoDelay** | number | 500 | Delay timeout in milliseconds |
| **ngxMatNumberDecrementSpinnerAutoRepeat** | number | 25 | Repeat interval in milliseconds |
