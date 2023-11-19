<template>
  <div id="cesiumContainer" style="height: 100%"></div>
</template>

<script lang="ts">
import * as Cesium from "cesium";

export default {
  inject: ["openmct", "domainObject"],
  data() {
    return {};
  },
  mounted() {
    console.debug("CesiumView::mounted called");
    this.viewer = new Cesium.Viewer("cesiumContainer", {
      imageryProvider: new Cesium.TileMapServiceImageryProvider({
        url: Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII"),
      }),
      terrainProvider: new Cesium.EllipsoidTerrainProvider(),
      animation: false,
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
      shadows: false,
    });
    this.subscriptions = new Map();
    this.composition = this.openmct.composition.get(this.domainObject);
    this.composition.on("add", this.addTelemetryObject);
    this.composition.on("remove", this.removeTelemetryObject);
    this.composition.load();
  },
  beforeUnmount() {
    this.removeAllSubscriptions();
    this.composition.off("add", this.addTelemetryObject);
    this.composition.off("remove", this.removeTelemetryObject);
  },
  methods: {
    addTelemetryObject(telemetryObject) {
      console.debug(
        "CesiumView::addTelemetryObject called with",
        telemetryObject,
      );
      const metadata = this.openmct.telemetry.getMetadata(telemetryObject);
      console.debug("CesiumView::addTelemetryObject metadata", metadata);
      this.subscribeToObject(telemetryObject);
    },
    removeTelemetryObject(identifier) {
      console.debug(
        "CesiumView::removeTelemetryObject called with",
        identifier,
      );
      const key = this.openmct.objects.makeKeyString(identifier);
      console.debug("CesiumView::removeTelemetryObject", key);
      if (this.subscriptions.has(key)) {
        const unsubscribe = this.subscriptions.get(key);
        console.debug(
          "CesiumView::removeTelemetryObject calling unsubscribe for",
          key,
          identifier,
          unsubscribe,
        );
        unsubscribe();
      } else {
        console.error(
          "CesiumView::removeTelemetryObject requested telemetry object removal for",
          key,
          identifier,
          "but subscription is not present. Current subscriptions:",
          this.subscriptions,
        );
      }
    },
    subscribeToObject(telemetryObject) {
      console.debug(
        "CesiumView::subscribeToObject called with",
        telemetryObject,
      );
      const key = this.openmct.objects.makeKeyString(
        telemetryObject.identifier,
      );
      const f = function (datum) {
        this.newData(telemetryObject, datum);
      };
      const unsubscribe = this.openmct.telemetry.subscribe(
        telemetryObject,
        f.bind(this),
      );
      this.subscriptions.set(key, unsubscribe);
    },
    removeAllSubscriptions() {
      console.debug("CesiumView::removeAllSubscriptions called");
      for (const [key, unsubscribe] of this.subscriptions) {
        console.debug(
          "CesiumView::removeAllSubscriptions calling unsubscribe for",
          key,
          unsubscribe,
        );
        unsubscribe();
      }
      this.subscriptions.clear();
    },
    newData(telemetryObject, datum) {
      const key = this.openmct.objects.makeKeyString(
        telemetryObject.identifier,
      );
      if (!this.subscriptions.has(key)) {
        console.error(
          "CesiumView::newData called, but there is no subscription active for ",
          key,
          telemetryObject,
        );
      }
    },
  },
};
</script>
