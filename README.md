# WorkTimeCountDownDesktop

Simple app to show remaining time until a person hits a 40hr week. This was mainly built to help hourly employees know when they hit their max hour limit.

## Getting started

####Prerequisite programs
* [Node/npm](https://nodejs.org/) 

* Angular CLI - To install execute-> `npm install -g angular-cli` <-in your CMD/Terminal 

####running app in browser
* Install local dependencies `npm install`

* Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Development progress

Updated to **Angular 4.0.0** + **TypeScript ~2.2.0** + bootstrap ^3.3.7

The main app work flow is located at _src/app/app.component.html_ and _src/app/app.component.ts_

Classes are located _src/app/classes_
* ConvertTime
  * This is where all time conversions take place. Any new type of time conversion should be added as a method to this class and used through this class.
* NumValidator
  * This will validate all numbers. Right now only Decimal numbers and Integers are validated. This adds better **bad input** handling than the JavaScript's _parseInt_ and _parseFloat_ methods

bower_components should not be used with webpack. Use npm node_modules for all dependencies.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Further help

**Note:** to "Run" build, test, or serve this project must have [angular-cli](https://github.com/angular/angular-cli) version 1.0.0 or greater installed.

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
