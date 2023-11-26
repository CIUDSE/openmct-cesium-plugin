import { CESIUM_KEY } from "./constants";
import { type OpenMCT } from "../openmct/dist/openmct";
import { type DomainObject } from "../openmct/dist/src/api/objects/ObjectAPI";
import type TelemetryAPI from "../openmct/dist/src/api/telemetry/TelemetryAPI";

export class CesiumCompositionPolicy {
  openmct: OpenMCT;

  constructor(openmct: OpenMCT) {
    console.debug("CesiumCompositionPolicy constructor called");
    this.openmct = openmct;
  }

  hasGeodesicTelemetry(domainObject: DomainObject): boolean {
    const telemetry: TelemetryAPI = this.openmct.telemetry;
    const metadata: unknown = telemetry.getMetadata(domainObject);
    console.debug(
      "CesiumCompositionPolicy::hasGeodesicTelemetry",
      "got domain object",
      domainObject,
      "with metadata",
      metadata,
    );
    return true;
  }

  allow(parent: DomainObject, child: DomainObject): boolean {
    if (parent.type !== CESIUM_KEY) {
      return true;
    }
    console.debug("CesiumCompositionPolicy::allow called with", parent, child);
    return this.hasGeodesicTelemetry(child);
  }
}
