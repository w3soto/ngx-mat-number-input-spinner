# NgxMatNumberInputSpinner

Number Spinner component for Angular Material

[![w3soto](https://circleci.com/gh/w3soto/ngx-mat-number-input-spinner.svg?style=svg)](https://circleci.com/gh/w3soto/ngx-mat-number-input-spinner)

[StackBlitz Demo](https://stackblitz.com/edit/angular-ivy-ebi2rm)

![Screenshot](https://raw.githubusercontent.com/w3soto/ngx-mat-number-input-spinner/master/screenshot.png "Screenshot")

## Features
* Replace default browser spinner 
* Custom buttons (prefix/suffix) for increment and decrement value 
* Read *step*, *min*, *max*, *readonly* and *disabled* properties from input element

## Installation
```shell
npm -i ngx-mat-number-input-spinner
```

## Example

For more details see *projects/demo* application

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
    type="number"
    step=".5"
    min="-10"
    max="10"
    [ngxMatNumberSpinner]="spinner"
    [(ngModel)]="myNumberInputValue">

    <ngx-mat-number-spinner #spinner matSuffix></ngx-mat-number-spinner>
    
</mat-form-field>
```

Custom template 
```html
<mat-form-field>
  
  <input 
    matInput 
    type="number" 
    min="0" 
    max="5" 
    value="0"
    [ngxMatNumberSpinner]="[spinnerUp,spinnerDown]">
    
  <button 
    mat-icon-button 
    color="primary" 
    matPrefix 
    ngxMatNumberIncrementSpinner
    #spinnerUp="ngxMatNumberIncrementSpinner">
    <mat-icon>thumb_up</mat-icon>
  </button>
  
  <button 
    mat-icon-button 
    color="warn" 
    matSuffix 
    ngxMatNumberDecrementSpinner
    #spinnerDown="ngxMatNumberDecrementSpinner">
    <mat-icon>thumb_down</mat-icon>
  </button>
  
</mat-form-field>
```

## Components
 
* **ngx-mat-number-spinner**

| @Input | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| **disableRipple** | boolean | false | Whether ripples are disabled |
| **autoDelay** | number | 500 | Delay timeout in milliseconds |
| **autoRepeat** | number | 25 | Repeat interval in milliseconds |

Exported as **ngxMatNumberSpinner**

## Directives 

* **input[ngxMatNumberSpinner]**

| @Input | Description |
| ------ | ----------- |
| **ngxMatNumberSpinner** | Reference to *ngx-mat-number-spinner* or list of references to *ngxMatNumberIncrementSpinner* and *ngxMatNumberDecrementSpinner* |

Exported as **ngxMatNumberSpinnerInput**


* **ngxMatNumberIncrementSpinner**

| @Input | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| **ngxMatNumberIncrementSpinnerAutoDelay** | number | 500 | Delay timeout in milliseconds |
| **ngxMatNumberIncrementSpinnerAutoRepeat** | number | 25 | Repeat interval in milliseconds |

Exported as **ngxMatNumberIncrementSpinner**

* **ngxMatNumberDecrementSpinnerFor**

| @Input | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| **ngxMatNumberDecrementSpinnerAutoDelay** | number | 500 | Delay timeout in milliseconds |
| **ngxMatNumberDecrementSpinnerAutoRepeat** | number | 25 | Repeat interval in milliseconds |

Exported as **ngxMatNumberDecrementSpinner**
