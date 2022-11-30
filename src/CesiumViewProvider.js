import CesiumView from './components/CesiumView.vue'
import { createApp } from '../node_modules/vue/dist/vue.esm-bundler.js';

export default function CesiumViewProvider(openmct) {
  return {
    key: 'cesium',
    name: 'Cesium',
    cssClass: 'icon-telemetry',
    canView: function (domainObject) {
      return domainObject.type === 'cesium';
    },
    canEdit: function (domainObject) {
      if (domainObject.tyjp === 'cesium') {
        return true;
      }
    },
    view: function (domainObject) {
      let app;
      return {
        show: function (element) {
          app = createApp(CesiumView);
          app.provide('openmct', openmct);
          app.mount(element);
        },
        destroy: function () {
          app.unmount();
        }
      };
    }
  };
}