# Calc
Simple app to show remaining time until a person hits a 40hr week. This was mainly built to help hourly employees know when they hit their max hour limit. There is still a lot of work to do but the basic functionality is there and accurate.

I used [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.22-1 to create the shell of this project.

## Development progress
I originally made this app using **Angular 1.4.0** and **JavaScript/ECMAScript 5**. I have since rewrote it using **Angular 2.2.3** and **Typescript ~2.0.3**. When I rewrote it, I added some new features and cleaned up the code a lot. Still needs some work but all the calculations should be correct(hopefully, I still need to write tests).
 
Next steps will be to abstract the basic calculator functionality into a reusable and separate class that the component will use... After this I need to create automated tests to check the edge case scenarios.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
