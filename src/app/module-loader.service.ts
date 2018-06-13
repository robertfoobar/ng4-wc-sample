import { Injectable } from '@angular/core';

/**
 * Takes care of loading es6 modules hosted on another location. Chooses between default JS module imports for modern browsers
 * or the esm-amd-loader way of importing modules for older browsers.
 */
@Injectable()
export class ModuleLoaderService {

  private es6ModulesSupported = false;

  private static insertOneNodeAfterAnotherNode(oneNode, anotherNode) {
    anotherNode.parentNode.insertBefore(oneNode, anotherNode.nextSibling);
  }

  constructor() {
    if ('registerElement' in document
      && 'import' in document.createElement('link')
      && 'content' in document.createElement('template')) {
      this.es6ModulesSupported = true;
    }
  }

  /**
   * Pass a url that points to the modules es6 class definition.
   * The loader will create script tags for the browser who will take care loading the module.
   * @param {string} url
   */
  load(url: string) {
    if (this.es6ModulesSupported) {
      const script = document.createElement('script');
      script.src = url;
      script.type = 'module';
      ModuleLoaderService.insertOneNodeAfterAnotherNode(script, document.getElementById('esm-amd-loader'));
    } else {
      const defineScript = document.createElement('script');
      defineScript.innerHTML = `define([\'${url}\']);`;
      ModuleLoaderService.insertOneNodeAfterAnotherNode(defineScript, document.getElementById('esm-amd-loader'));
    }
  }
}
