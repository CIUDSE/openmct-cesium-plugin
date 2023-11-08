import CesiumView from './components/CesiumView.vue'
import { createApp } from 'vue';

export default function CesiumViewProvider(openmct) {
  return {
    key: 'cesium',
    name: 'Cesium',
    cssClass: 'icon-telemetry',
    canView: function (domainObject) {
      return domainObject.type === 'cesium';
    },
    canEdit: function (domainObject) {
      if (domainObject.type === 'cesium') {
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