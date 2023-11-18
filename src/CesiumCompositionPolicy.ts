import { CESIUM_KEY } from "./CesiumConstants"
import { OpenMCT } from "../node_modules/openmct/dist/openmct"

export class CesiumCompositionPolicy {
    openmct: OpenMCT

    constructor(openmct: OpenMCT) {
        console.debug('CesiumCompositionPolicy constructor called')
        this.openmct = openmct
    }


    hasGeodesicTelemetry(domainObject: any) {
        let metadata = this.openmct.telemetry.getMetadata(domainObject)
        console.debug('CesiumCompositionPolicy::hasGeodesicTelemetry', 'got domain object', domainObject, 'with metadata', metadata)
        return true
    }
    
    
    allow(parent: any, child: any) {
        if ( parent.type !== CESIUM_KEY ) { return true }
        console.debug('CesiumCompositionPolicy::allow called with', parent, child)
        return this.hasGeodesicTelemetry(child)
    }
}