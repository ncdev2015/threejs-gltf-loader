<script setup>
    import { onMounted } from 'vue'
    import Viewer from './classes/viewer.js'

    function start() {
        let viewer = new Viewer(window.innerWidth, window.innerHeight);
        document.getElementById("viewer").appendChild(viewer.renderer.domElement);
    }

    onMounted( () => start());
</script>

<template>
  <div id="viewer">
  </div>
</template>

<style scoped>
    #viewer {
        float: left
    }
</style>