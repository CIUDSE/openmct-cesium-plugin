<template>
  <div id="cesiumContainer" style="height: 100%;"></div>
</template>

<script>
import * as Cesium from 'cesium'

export default {
  inject: ['openmct', 'domainObject'],
  data() {
    return {}
  },
  mounted() {
    console.debug('CesiumView::mounted called')
    this.viewer = new Cesium.Viewer('cesiumContainer', {
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
    this.composition = this.openmct.composition.get(this.domainObject)
    this.composition.on('add', this.addTelemetryObject)
    this.composition.on('remove', this.removeTelemetryObject)
    this.composition.load()
  },
  beforeUnmount() {
    this.removeAllSubscriptions();
    this.composition.off('add', this.addTelemetryObject)
    this.composition.off('remove', this.removeTelemetryObject)
  },
  methods: {
    addTelemetryObject(telemetryObject) {
      console.debug('CesiumView::addTelemetryObject called with', telemetryObject)
      const key = this.openmct.objects.makeKeyString(telemetryObject.identifier)
      console.debug('CesiumView::addTelemetryObject', key)
    },
    removeTelemetryObject(identifier) {
      console.debug('CesiumView::removeTelemetryObject called with', identifier)
      const key = this.openmct.objects.makeKeyString(identifier)
      console.debug('CesiumView::removeTelemetryObject', key)
    },
    subscribeToObject(telemetryObject) {
      console.debug('CesiumView::subscribeToObject called with', telemetryObject)
      const key = this.openmct.makeKeyString(telemetryObject.identifier);
    },
    removeAllSubscriptions() {
      console.debug('CesiumView::removeAllSubscriptions called')
    }
  }
}
</script>