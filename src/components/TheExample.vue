<script setup lang="ts">
import type { Mesh, PerspectiveCamera } from 'three'
import { Color, SRGBColorSpace } from 'three'
import { reactive, shallowRef, watch, onMounted } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, CameraControls } from '@tresjs/cientos'
import { TresCanvasProps } from '@tresjs/core/dist/components/TresCanvas.vue.js'
import { useTweakpane } from '@/composables/useTweakpane'
// import { useCameraAni, useCubeAni } from '@/composables/useAnimation'
// import MyTresText from './components/MyTresText.vue'

const { objectState } = useTweakpane()

const canvasProps = reactive<TresCanvasProps>({
  windowSize: true,
  clearColor: '#2B3846',
  alpha: true,
  shadows: true,
  powerPreference: 'high-performance',
  outputColorSpace: SRGBColorSpace,
})

const cubeRef = shallowRef<Mesh>()
const cameraRef = shallowRef<PerspectiveCamera>()

// watch(cameraRef, camera => {
//   if (!camera) return
//   useCameraAni(camera)
//   if (!cubeRef.value) return
//   useCubeAni(cubeRef.value)
// })

// prettier-ignore
const positionArray = new Float32Array([
  0 ,0, 0, // First vertex
  0 ,1, 0, // Second vertex
  1 ,0, 0, // Third vertex
])

const { onLoop } = useRenderLoop()

onLoop(({ delta, elapsed }) => {
  /**
   * Do something on every frame
   * delta => 每一幀的時間
   * elapsed => 經過的時間
   */

  if (cubeRef.value) {
    // cubeRef.value.rotation.x += delta
    // cubeRef.value.rotation.z = elapsed
    // cubeRef.value.position.y = Math.sin(elapsed * 2)
  }
})
</script>

<template>
  <TresCanvas v-bind="canvasProps">
    <!-- View -->
    <TresPerspectiveCamera
      ref="cameraRef"
      :args="[75, 1, 0.1, 1000]"
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls
      enable-damping
      :min-distance="1"
    />
    <!-- <CameraControls make-default /> -->
    <TresAxesHelper />
    <TresGridHelper :args="[10, 10]" />

    <!-- Object -->
    <TresMesh
      ref="cubeRef"
      :position="[0, 0, 0]"
    >
      <!-- Geometry -->
      <TresBoxGeometry :args="[1, 1, 1]" />
      <!-- <TresSphereGeometry :args="[1, 24, 24, 0, Math.PI]" /> -->
      <!-- <TresConeGeometry :args="[1, 2, 32]" /> -->
      <!-- <TresTorusGeometry :args="[1, 0.4, 16, 100]" /> -->
      <!-- <TresTorusKnotGeometry :args="[1, 0.4, 100, 100]" /> -->
      <!-- <TresBufferGeometry :position="[positionArray, 3]" /> -->

      <!-- Material -->
      <!-- <TresMeshNormalMaterial :wireframe="state.wireframe" /> -->
      <TresMeshBasicMaterial
        :color="new Color('#ff0000')"
        :wireframe="objectState.wireframe"
      />
    </TresMesh>
    <!-- <MyTresText /> -->
  </TresCanvas>
</template>
