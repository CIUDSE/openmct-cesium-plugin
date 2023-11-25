<template>
  <div id="cesiumContainer" style="height: 100%"></div>
</template>

<script setup lang="ts">
import * as Cesium from "cesium";
import { inject, onBeforeUnmount, onMounted } from "vue";
import { OpenMCT } from "../../openmct/dist/openmct";
import type {
  DomainObject,
  Identifier,
} from "../../openmct/dist/src/api/objects/ObjectAPI";

const openmctInjection = inject<OpenMCT>("openmct");
if (openmctInjection === undefined) {
  throw "CesiumView: openmct is undefined";
}
const openmct = openmctInjection;
const domainObject = inject<DomainObject>("domainObject");
if (domainObject === undefined) {
  throw "CesiumView: domainObject is undefined";
}

const viewerOptions = {
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
};

var viewer: Cesium.Viewer | undefined = undefined;
const subscriptions = new Map<string, CallableFunction>();
const composition = openmct.composition.get(domainObject);

function addTelemetryObject(telemetryObject: DomainObject) {
  const metadata = openmct.telemetry.getMetadata(telemetryObject);
  subscribeToObject(telemetryObject);
}

function subscribeToObject(telemetryObject: DomainObject) {
  const key = openmct.objects.makeKeyString(telemetryObject.identifier);
  const f = function (datum: any) {
    newData(telemetryObject, datum);
  };
  const unsubscribe = openmct.telemetry.subscribe(telemetryObject, f, {});
  subscriptions.set(key, unsubscribe);
}

function removeTelemetryObject(identifier: Identifier) {
  const key = openmct.objects.makeKeyString(identifier);
  const unsubscribe = subscriptions.get(key);
  if (unsubscribe !== undefined) {
    unsubscribe();
  } else {
    console.error(
      "CesiumView::removeTelemetryObject requested telemetry object removal for",
      key,
      identifier,
      "but subscription is not present. Current subscriptions:",
      subscriptions,
    );
  }
}

function removeAllSubscriptions() {
  for (const [_key, unsubscribe] of subscriptions) {
    unsubscribe();
  }
  subscriptions.clear();
}

function newData(telemetryObject: DomainObject, datum: any) {
  const key = openmct.objects.makeKeyString(telemetryObject.identifier);
  if (!subscriptions.has(key)) {
    console.error(
      "CesiumView::newData called, but there is no subscription active for ",
      key,
      telemetryObject,
    );
  }
}

onMounted(() => {
  viewer = new Cesium.Viewer("cesiumContainer", viewerOptions);
  composition.on("add", addTelemetryObject);
  composition.on("remove", removeTelemetryObject);
});

onBeforeUnmount(() => {
  removeAllSubscriptions();
  composition.off("add", addTelemetryObject);
  composition.off("remove", removeTelemetryObject);
});
</script>
