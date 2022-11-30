<template>
  <div id="cesiumContainer"></div>
</template>

<script>
import * as Cesium from '../../node_modules/cesium/Build/Cesium/Cesium.js';

export default {
  inject: ['openmct'],
  data() {
    return {
      viewer: null
    }
  },
  mounted() {
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
  }
}
</script>