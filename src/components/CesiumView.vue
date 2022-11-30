<template>
    <div id="cesiumContainer"></div>
</template>

<script>
    export default {
        inject: ['openmct', 'Cesium'],
        data() {
            return {
                viewer: null
            }
        },
        mounted() {
            this.viewer = new this.Cesium.Viewer('cesiumContainer');
        }
    }
</script>