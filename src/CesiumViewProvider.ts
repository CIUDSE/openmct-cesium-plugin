import { CESIUM_VIEW, CESIUM_KEY } from './CesiumConstants';
import CesiumView from './components/CesiumView.vue'
import { createApp } from 'vue';

export default function CesiumViewProvider(openmct) {
  return {
    key: CESIUM_VIEW,
    name: 'Cesium',
    cssClass: 'icon-telemetry',
    canView: function (domainObject) {
      return domainObject.type === CESIUM_KEY;
    },
    canEdit: function (domainObject) {
      return domainObject.type === CESIUM_KEY;
    },
    view: function (domainObject) {
      let app;
      return {
        show: function (element) {
          app = createApp(CesiumView);
          app.provide('openmct', openmct);
          app.provide('domainObject', domainObject)
          app.mount(element);
        },
        destroy: function () {
          app.unmount();
        }
      };
    }
  };
}