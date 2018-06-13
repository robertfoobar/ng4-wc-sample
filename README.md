# Angular 4 and Polymer 3 web component integration
I haven't found a detailed explanation on how to integrate ES6 style web component modules (here based on Polymer 3) into an Angular 4+ app. So I document it here.

## Integration scenario
Imagine different teams developing web components running their own release cycle. So... 
* you want to integrate a web component hosted by a third party at a given URL / at runtime. 
* you explicitly don't want to use self-hosted NPM packages (although you could given the solution provided here).

## Polyfill the Angular App
You need to polyfill older browsers that are not (yet) web components compliant:
This is the steps which caused a lot of issues for me because I wanted to support IE11 along with ever-green browsers. Theoretically there are two strategies on how to polyfill:
1. Polymer-driven polyfilling: outside the angular app in index.html. Bootstrap Angular app second.
2. Angular-driven polyfilling: let Angular bootstrap first, i.e. let angular do the polyfilling: Bootstrap web components second.

It turns out that (2) is IMHO the better way to go. (1) failed because of current [issues](https://github.com/webcomponents/webcomponentsjs/issues/942) in webcomponentsjs.

So, in order to polyfill just follow these steps:  
```
 npm i @webcomponents/webcomponentsjs --save
```
in polyfills.ts add the following line after the zone polyfill:
```
import '@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce-pf.js';
```

## ES6 module loader for older browsers
Since older browsers do not understand the JS module syntax, you need to have an adapter that enables these browsers to load such modules. I use a code snippet from [polyserve](https://github.com/Polymer/polyserve) which you can find under src/assets/esm-amd-loader.min.js. You need to include it in your index.html
```
  <script id="esm-amd-loader" src="assets/esm-amd-loader.min.js"></script>
```
Note: This script node has an id which will be relevant later in the process.

## Module loader service
You can only load modules *after* the angular app bootstrapped completely. Since the JS module loading process depends on the platform, i.e. older browsers don't understand js modules, you unfortunately need a few lines of additional bootstrapping code.
The module-loader.service.ts will handle this loading process. It will add html script tags after the esm-amd-loader script into the HTML head. You need to call the module-loader service during initialization of your app.component.ts:

```
ngOnInit(): void {
    this.webComponentLoader.load('https://localhost:8000/custom-polymer-element.js');
  }
```

## Starting the app
First you need to host a custom element under https://localhost:8000/custom-polymer-element.js for this to work:
```
 npm i -g polymer-cli@1.7.2
 mkdir custom-polymer-element && cd custom-polymer-element
 polymer init polymer-3-element
 polymer serve --protocol https/1.1
```

Then you can install and start the app

```
 npm install
 npm start
```

# Resources
* [Using Web Components with Angular](https://www.youtube.com/watch?v=Ucq9F-7Xp8I)
* [Polyserve Project](https://github.com/Polymer/tools/tree/master/packages/polyserve)
* [Webcomponentsjs Project](https://github.com/webcomponents/webcomponentsjs)
* [How to host es6 custom module in static HTML](https://github.com/robertfoobar/es6-custom-element)

# Known issues
* Accept self-signed dev SSL certificates from the polymer dev server otherwise HTTP requests from your Angular app will be cancelled.
* Chrome initially blocks requests from http://localhost:4200 (angular hosting) to https://localhost:8000 (polymer hosting). You can use a [Chrome CORS plugin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) to work around that for demo purposes. IE doesn't care about CORS.
