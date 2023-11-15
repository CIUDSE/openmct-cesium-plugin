import CesiumCompositionPolicy from './CesiumCompositionPolicy';
import CesiumViewProvider from './CesiumViewProvider'

export default function CesiumPlugin () {
  return function install (openmct) {
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

    openmct.objectViews.addProvider(new CesiumViewProvider(openmct));

    openmct.composition.addPolicy(CesiumCompositionPolicy(openmct).allow);
  }
}
