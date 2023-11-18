import { CESIUM_KEY } from './CesiumConstants'
import CesiumViewComponent from './components/CesiumView.vue'
import { type App, createApp } from 'vue'
import { type OpenMCT } from '../openmct/dist/openmct'
import type { DomainObject } from '../openmct/dist/src/api/objects/ObjectAPI'

export class CesiumViewProvider {
  key = CESIUM_KEY
  name = 'Cesium'
  cssClass = 'icon-telemetry'
  openmct: OpenMCT

  constructor (openmct: OpenMCT) {
    this.openmct = openmct
  }

  canView (domainObject: DomainObject): boolean {
    return domainObject.type === CESIUM_KEY
  }

  canEdit (domainObject: DomainObject): boolean {
    return domainObject.type === CESIUM_KEY
  }

  view (domainObject: DomainObject): CesiumView {
    return new CesiumView(this.openmct, domainObject)
  }
}

class CesiumView {
  domainObject: DomainObject
  openmct: OpenMCT
  app: App<Element> | null

  constructor (openmct: OpenMCT, domainObject: DomainObject) {
    this.openmct = openmct
    this.domainObject = domainObject
    this.app = null
  }

  show (element: string | Element): void {
    this.app = createApp(CesiumViewComponent)
    this.app.provide('openmct', this.openmct)
    this.app.provide('domainObject', this.domainObject)
    this.app.mount(element)
  }

  destroy (): void {
    if (this.app == null) {
      console.error('`CesiumView::destroy` called, but `app` is `null`. `destroy` should not be called before `show`')
      return
    }
    this.app.unmount()
  }
}
