<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { Color, SRGBColorSpace } from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, vLightHelper, vAlwaysLookAt } from '@tresjs/cientos'
import { TresCanvasProps } from '@tresjs/core/dist/components/TresCanvas.vue.js'
import { useTweakpane } from '@/composables/useTweakpane'

const { objectState, pointLightState, spotLightState, rectAreaLightState } =
  useTweakpane()

const canvasProps = reactive<TresCanvasProps>({
  windowSize: true,
  clearColor: '#2B3846',
  alpha: true,
  shadows: true,
  powerPreference: 'high-performance',
  outputColorSpace: SRGBColorSpace,
})

const pointLightPosition = computed<[number, number, number]>(() => {
  return [
    pointLightState.position.x,
    pointLightState.position.y,
    pointLightState.position.z,
  ]
})

const spotLightPosition = computed<[number, number, number]>(() => {
  return [
    spotLightState.position.x,
    spotLightState.position.y,
    spotLightState.position.z,
  ]
})

const rectAreaLightPosition = computed<[number, number, number]>(() => {
  return [
    rectAreaLightState.position.x,
    rectAreaLightState.position.y,
    rectAreaLightState.position.z,
  ]
})

const rectAreaLightAlwaysLookAtPosition = computed<[number, number, number]>(
  () => {
    return [
      rectAreaLightState.alwaysLookAt.x,
      rectAreaLightState.alwaysLookAt.y,
      rectAreaLightState.alwaysLookAt.z,
    ]
  },
)
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
      <TresMesh cast-shadow>
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
    <TresMesh
      :rotate-x="-Math.PI / 2"
      receive-shadow
    >
      <TresPlaneGeometry :args="[10, 10]" />
      <TresMeshStandardMaterial :color="new Color('#ffffff')" />
    </TresMesh>

    <!-- Light -->
    <!-- <TresAmbientLight
      :color="new Color('gray')"
      :intensity="1"
      v-light-helper
    /> -->
    <TresDirectionalLight
      ref="directionRef"
      :color="new Color('#fffacd')"
      :intensity="3"
      :position="[2, 4, 5]"
      cast-shadow
      v-light-helper
    />
    <!-- <TresHemisphereLight
      :args="['orangered', 'gold', 5]"
      v-light-helper
    /> -->
    <!-- <TresPointLight
      :color="new Color(pointLightState.color)"
      :intensity="pointLightState.intensity"
      :position="pointLightPosition"
      :distance="pointLightState.distance"
      :decay="pointLightState.decay"
      v-light-helper
    /> -->
    <TresSpotLight
      :color="new Color(spotLightState.color)"
      :intensity="spotLightState.intensity"
      :position="spotLightPosition"
      :angle="spotLightState.angle"
      :distance="spotLightState.distance"
      :decay="spotLightState.decay"
      :penumbra="spotLightState.penumbra"
      v-light-helper
    />
    <TresRectAreaLight
      :color="new Color(rectAreaLightState.color)"
      :intensity="rectAreaLightState.intensity"
      :width="rectAreaLightState.width"
      :height="rectAreaLightState.height"
      :position="rectAreaLightPosition"
      v-always-look-at="rectAreaLightAlwaysLookAtPosition"
    />
  </TresCanvas>
</template>
