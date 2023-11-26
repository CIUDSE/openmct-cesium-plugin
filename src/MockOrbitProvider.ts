import type { DomainObject } from "../openmct/dist/src/api/objects/ObjectAPI";
import { MOCK_ORBIT_KEY } from "./constants";

export function MockOrbitProvider() {
    console.debug("MockOrbitProvider called")
    return {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        supportsRequest: (domainObject: DomainObject, options) => {
            console.debug("MockOrbitProvider::supportsRequest called with", domainObject, options)
            return domainObject.type === MOCK_ORBIT_KEY
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        request: (domainObject: DomainObject, options) => {
            console.debug("MockOrbitProvider::request called with", domainObject, options)
            return []
        },
    }
}