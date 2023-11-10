import { CESIUM_KEY } from "./CesiumConstants"

export default function CesiumCompositionPolicy(openmct) {
    console.debug('CesiumCompositionPolicy', 'called')

    function hasGeodesicTelemetry(domainObject) {
        let metadata = openmct.telemetry.getMetadata(domainObject)
        console.debug('CesiumCompositionPolicy::hasGeodesicTelemetry', 'got domain object', domainObject, 'with metadata', metadata)
        return true
    }
    
    return {
        allow: function (parent, child) {
            if ( parent.type !== CESIUM_KEY ) { return true }
            console.debug('CesiumCompositionPolicy::allow called with', parent, child)
            return hasGeodesicTelemetry(child)
        }
    }
}