import TelemetryObjectManager from "./TelemetryObjectManager"

export default class CesiumMapView {
    constructor (domainObject) {
      this.domainObject = domainObject
      this.cesiumTelemetryObjects = new Map()
      this.compositionManager = new TelemetryObjectManager(domainObject, (domainObject) => { this.addTelemetryObject(domainObject) }, (domainObject) => { this.removeTelemetryObject(domainObject) })
    }
  
    addTelemetryObject (domainObject) {
      console.log('Requesting collection')
      const telemetryCollection = openmct.telemetry.requestCollection(domainObject)
      telemetryCollection.load()
      const cesiumTelemetryObject = {
        telemetryCollection: telemetryCollection,
        cartesianPositions: []
      }
      const callbackProperty = new Cesium.CallbackProperty((_time, result) => {
        result = cesiumTelemetryObject.cartesianPositions
        return result
      })
      const lineEntity = this.viewer.entities.add({
        name: domainObject.name,
        polyline: {
          positions: callbackProperty,
          width: 3,
          arcType: Cesium.ArcType.None
        }
      })
      cesiumTelemetryObject.lineEntity = lineEntity
      this.cesiumTelemetryObjects.set(domainObject.identifier, cesiumTelemetryObject)
    }
  
    removeTelemetryObject (domainObject) {
      // TODO: Remove Line Entity
      this.cesiumTelemetryObjects.delete(domainObject.identifier)
    }
  
    updatePositions () {
      this.cesiumTelemetryObjects.forEach((cesiumTelemetryObject) => {
        cesiumTelemetryObject.cartesianPositions = cesiumTelemetryObject.telemetryCollection.getAll().map((datum) => {
          return Cesium.Cartesian3.fromRadians(datum.lng, datum.lat, datum.hgt)
        })
      })
    }
  
    show (element) {
      /*
      this.viewer = new Cesium.Viewer(element, {
        imageryProvider: new Cesium.TileMapServiceImageryProvider({
          url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
        }),
        terrainProvider: new Cesium.EllipsoidTerrainProvider(),
        animation: false,
        baseLayerPick: false,
        fullscreenButton: false,
        vrButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: true,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        scene3DOnly: false,
        shouldAnimate: false,
        shadows: false
      })
  
      if (this.domainObject.type === 'cesium.geodatum') {
        this.addTelemetryObject(this.domainObject)
      }
  
      this.intervalId = setInterval(() => { this.updatePositions() }, 1000)
      */
    }
  
    destroy () {
      /*
      clearInterval(this.intervalId)
      this.compositionManager.destroy()
      */
    }
  }