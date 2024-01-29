# Global

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## Code scaffolding

Run `ng generate component component-name --project global` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project global`.
> Note: Don't forget to add `--project global` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build global` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build global`, go to the dist folder `cd dist/global` and run `npm publish`.

## Running unit tests

Run `ng test global` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


Once build the application, we will get dist folder along with component
assets folder need to export to dist folder to access assets in respective application

`"build-library-assets": "cpx \"./projects/global/assets/**/*\" \"./dist/global/assets\""`

This script written in global "package.json"

run the command to export assets
`npm run build-library-assets`

To convert libary to npm package

Right click on dist > library name(name) ----> open in integrated terminal --> `npm pack`

Finally we get npm file name called ex - `global-0.0.1.tgz`



