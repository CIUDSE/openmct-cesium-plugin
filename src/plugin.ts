import CesiumCompositionPolicy from './CesiumCompositionPolicy';
import CesiumViewProvider from './CesiumViewProvider'
import { OpenMCT } from '../node_modules/openmct/dist/openmct';

export default function CesiumPlugin () {
  return function install (openmct: OpenMCT) {
        openmct.types.addType('cesium', {
      name: 'Cesium',
      description: 'Graphically visualize geodetic data',
      creatable: true,
      cssClass: 'icon-telemetry',
      initialize: function (domainObject) {
        domainObject.composition = []
      },
      form: [ // stuff to add to the create new object dialog
      ],
    });

    openmct.objectViews.addProvider(CesiumViewProvider(openmct));

    openmct.composition.addPolicy(CesiumCompositionPolicy(openmct).allow);
  }
}
