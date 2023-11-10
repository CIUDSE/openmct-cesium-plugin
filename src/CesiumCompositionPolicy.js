import { CESIUM_KEY } from "./CesiumConstants"

export default function CesiumCompositionPolicy(openmct) {
    console.log('CesiumCompositionPolicy', 'called')

    function hasGeodesicTelemetry(domainObject) {
        console.log('CesiumCompositionPolicy::hasGeodesicTelemetry', 'got domain object', domainObject)
        return true
    }
    
    return {
        allow: function (parent, child) {
            if ( parent.type !== CESIUM_KEY ) { return true }
            console.log('CesiumCompositionPolicy::allow', 'called with', parent, child)
            console.log(parent.type, CESIUM_KEY)
            return hasGeodesicTelemetry(child)
        }
    }
}