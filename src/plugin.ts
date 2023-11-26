import { CesiumCompositionPolicy } from "./CesiumCompositionPolicy";
import { CesiumViewProvider } from "./CesiumViewProvider";
import { type OpenMCT } from "../openmct/dist/openmct";
import type { DomainObject } from "../openmct/dist/src/api/objects/ObjectAPI";
import { CESIUM_KEY, MOCK_ORBIT_KEY } from "./constants";
import { MockOrbitProvider } from "./MockOrbitProvider";

export function CesiumPlugin() {
  return function install(openmct: OpenMCT) {
    openmct.types.addType(CESIUM_KEY, {
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

export function MockOrbitGeneratorPlugin() {
  return function install(openmct: OpenMCT) {
    openmct.types.addType(MOCK_ORBIT_KEY, {
      name: "Mock Orbit",
      creatable: true,
      cssClass: "icon-telemetry",
      telemetry: {
        values: [
          {
            key: "latitude",
            name: "Latitude"
          },
          {
            key: "longitude",
            name: "Longitude",
            hints: {
              range: 1
            }
          },
          {
            key: "utc",
            name: "Timestamp",
            hints: {
              domain: 1
            }
          }
        ]
      }
    })

    openmct.telemetry.addProvider(MockOrbitProvider())
  }
}
