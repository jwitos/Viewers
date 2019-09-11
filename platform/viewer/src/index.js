/**
 * Entry point for development and production PWA builds.
 * Packaged (NPM) builds go through `index-umd.js`
 */

import 'regenerator-runtime/runtime';

import App from './App.js';
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * EXTENSIONS
 * =================
 *
 * Importing and modifying the extensions our app uses HERE allows us to leverage
 * tree shaking and a few other niceties. However, by including them here they become
 * "baked in" to the published application.
 *
 * Depending on your use case/needs, you may want to consider not adding any extensions
 * by default HERE, and instead provide them via the configuration specified at
 * `window.config.extensions`, or by using the exported `App` component, and passing
 * in your extensions as props.
 */
import OHIFVTKExtension from '@ohif/extension-vtk';
import OHIFDicomHtmlExtension from '@ohif/extension-dicom-html';
import OHIFDicomMicroscopyExtension from '@ohif/extension-dicom-microscopy';
import OHIFDicomPDFExtension from '@ohif/extension-dicom-pdf';

// Default Settings
let config = window ? window.config : {};
config = config || {};

const appDefaults = {
  routerBasename: '/',
  extensions: [
    OHIFVTKExtension,
    OHIFDicomHtmlExtension,
    OHIFDicomMicroscopyExtension,
    OHIFDicomPDFExtension,
  ],
};
const appProps = Object.assign({}, appDefaults, config);

// Service Worker
const browserSupportsServiceWorkers = 'serviceWorker' in navigator;
if (browserSupportsServiceWorkers) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${appProps.routerBasename}service-worker.js`)
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Create App
const app = React.createElement(App, appProps, null);

// Render App
ReactDOM.render(app, document.getElementById('root'));
