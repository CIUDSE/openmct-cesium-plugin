import { CesiumCompositionPolicy } from './CesiumCompositionPolicy'
import { CesiumViewProvider } from './CesiumViewProvider'
import { type OpenMCT } from '../node_modules/openmct/dist/openmct'

export default function CesiumPlugin () {
  return function install (openmct: OpenMCT) {
    openmct.types.addType('cesium', {
      name: 'Cesium',
      description: 'Graphically visualize geodetic data',
      creatable: true,
      cssClass: 'icon-telemetry',
      initialize: function (domainObject: any) {
        domainObject.composition = []
      },
      form: [ // stuff to add to the create new object dialog
      ]
    })

    openmct.objectViews.addProvider(new CesiumViewProvider(openmct))

    const cesiumCompositionPolicy = new CesiumCompositionPolicy(openmct)
    openmct.composition.addPolicy(cesiumCompositionPolicy.allow.bind(cesiumCompositionPolicy))
  }
}
