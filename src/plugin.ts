import { CesiumCompositionPolicy } from "./CesiumCompositionPolicy";
import { CesiumViewProvider } from "./CesiumViewProvider";
import { type OpenMCT } from "../openmct/dist/openmct";
import type { DomainObject } from "../openmct/dist/src/api/objects/ObjectAPI";

export default function CesiumPlugin() {
  return function install(openmct: OpenMCT) {
    openmct.types.addType("cesium", {
      name: "Cesium",
      description: "Graphically visualize geodetic data",
      creatable: true,
      cssClass: "icon-telemetry",
      initialize: function (domainObject: DomainObject) {
        domainObject.composition = [];
      },
      form: [
        // stuff to add to the create new object dialog
      ],
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    openmct.objectViews.addProvider(new CesiumViewProvider(openmct));

    const cesiumCompositionPolicy = new CesiumCompositionPolicy(openmct);
    openmct.composition.addPolicy(
      cesiumCompositionPolicy.allow.bind(cesiumCompositionPolicy),
    );
  };
}
