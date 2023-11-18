import { CESIUM_VIEW, CESIUM_KEY } from './CesiumConstants'
import CesiumViewComponent from './components/CesiumView.vue'
import { type App, createApp } from 'vue'
import { type OpenMCT } from '../openmct/dist/openmct'

export class CesiumViewProvider {
  key = CESIUM_KEY
  name = 'Cesium'
  cssClass = 'icon-telemetry'
  openmct: OpenMCT

  constructor (openmct: OpenMCT) {
    this.openmct = openmct
  }

  canView (domainObject: any) {
    return domainObject.type === CESIUM_KEY
  }

  canEdit (domainObject: any) {
    return domainObject.type === CESIUM_KEY
  }

  view (domainObject: any) {
    return new CesiumView(this.openmct, domainObject)
  }
}

class CesiumView {
  domainObject: any
  openmct: OpenMCT
  app: App<Element>

  constructor (openmct: OpenMCT, domainObject: any) {
    this.openmct = openmct
    this.domainObject = domainObject
  }

  show (element: string | Element) {
    this.app = createApp(CesiumViewComponent)
    this.app.provide('openmct', this.openmct)
    this.app.provide('domainObject', this.domainObject)
    this.app.mount(element)
  }

  destroy () {
    this.app.unmount()
  }
}
