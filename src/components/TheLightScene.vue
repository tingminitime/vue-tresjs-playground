<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { Color, SRGBColorSpace } from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, vLightHelper, vAlwaysLookAt } from '@tresjs/cientos'
import { TresCanvasProps } from '@tresjs/core/dist/components/TresCanvas.vue.js'
import { useTweakpane } from '@/composables/useTweakpane'

const { objectState, lightState } = useTweakpane()

const canvasProps = reactive<TresCanvasProps>({
  windowSize: true,
  clearColor: '#2B3846',
  alpha: true,
  shadows: true,
  powerPreference: 'high-performance',
  outputColorSpace: SRGBColorSpace,
})

const lightPosition = computed<[number, number, number]>(() => {
  return [lightState.position.x, lightState.position.y, lightState.position.z]
})
</script>

<template>
  <TresCanvas v-bind="canvasProps">
    <!-- View -->
    <TresPerspectiveCamera />
    <OrbitControls
      enable-damping
      :max-distance="100"
      :min-distance="1"
    />
    <!-- <CameraControls make-default /> -->
    <TresAxesHelper />
    <TresGridHelper :args="[10, 10]" />

    <!-- Object -->
    <TresGroup :position="[0, 2, 0]">
      <TresMesh>
        <TresTorusGeometry :args="[1, 0.4, 32, 32]" />
        <TresMeshStandardMaterial
          :color="new Color('#e4fa76')"
          :wireframe="objectState.wireframe"
        />
      </TresMesh>
      <TresMesh :position="[4, 0, 0]">
        <TresBoxGeometry :args="[2, 2, 2]" />
        <TresMeshStandardMaterial :wireframe="objectState.wireframe" />
      </TresMesh>
      <TresMesh :position="[-4, 0, 0]">
        <TresTorusKnotGeometry :args="[1, 0.4, 100, 100]" />
        <TresMeshStandardMaterial :wireframe="objectState.wireframe" />
      </TresMesh>
    </TresGroup>
    <TresMesh :rotate-x="-Math.PI / 2">
      <TresPlaneGeometry :args="[10, 10]" />
      <TresMeshStandardMaterial :color="new Color('#ffffff')" />
    </TresMesh>

    <!-- Light -->
    <!-- <TresAmbientLight
      :color="new Color('gray')"
      :intensity="1"
      v-light-helper
    /> -->
    <!-- <TresDirectionalLight
      ref="directionRef"
      :color="new Color('#fffacd')"
      :intensity="3"
      :position="[2, 4, 5]"
      v-light-helper
    /> -->
    <!-- <TresHemisphereLight
      :args="['orangered', 'gold', 5]"
      v-light-helper
    /> -->
    <TresPointLight
      :args="['yellow', 2, 10]"
      :color="new Color('yellow')"
      v-bind:position="lightPosition"
      :intensity="lightState.intensity"
      :distance="lightState.distance"
      :decay="lightState.decay"
      v-light-helper
    />
    <TresRectAreaLight
      :args="['hotpink', 2, 5, 5]"
      :position="[0, 1, 2]"
      v-always-look-at="[-4, 0, 0]"
    />
  </TresCanvas>
</template>
