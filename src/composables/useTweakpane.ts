import { reactive, onMounted, nextTick, onUnmounted } from 'vue'
import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'

interface TweakpaneState {
  wireframe: boolean
}

interface PointLightState {
  color: string
  intensity: number
  position: { x: number; y: number; z: number }
  distance: number
  decay: number
}

interface SpotLightState {
  color: string
  intensity: number
  position: { x: number; y: number; z: number }
  angle: number
  distance: number
  decay: number
  penumbra: number
}

interface RectAreaLightState {
  color: string
  intensity: number
  position: { x: number; y: number; z: number }
  width: number
  height: number
  alwaysLookAt: { x: number; y: number; z: number }
}

export function useTweakpane() {
  const pane = new Pane()
  pane.registerPlugin(EssentialsPlugin)

  const objectState = reactive<TweakpaneState>({
    wireframe: false,
  })

  const pointLightState = reactive<PointLightState>({
    color: '#ffffff',
    intensity: 5,
    position: { x: 0, y: 0, z: 0 },
    distance: 0,
    decay: 3,
  })

  const spotLightState = reactive<SpotLightState>({
    color: '#ffffff',
    intensity: 5,
    position: { x: 0, y: 0, z: 0 },
    angle: Math.PI / 3,
    distance: 1,
    decay: 3,
    penumbra: 0.5,
  })

  const rectAreaLightState = reactive<RectAreaLightState>({
    color: '#ffd700',
    intensity: 2,
    position: { x: 0, y: 0, z: 0 },
    width: 2,
    height: 2,
    alwaysLookAt: { x: 0, y: 0, z: 0 },
  })

  onMounted(() => {
    nextTick(() => {
      // FPS
      const fpsGraph = pane.addBlade({
        view: 'fpsgraph',
        label: 'fps',
        rows: 2,
      }) as EssentialsPlugin.FpsGraphBladeApi

      fpsGraph.max = 120

      function renderFpsGraph() {
        fpsGraph.begin()
        fpsGraph.end()
        requestAnimationFrame(renderFpsGraph)
      }

      renderFpsGraph()

      /* Wireframe */
      pane.addBinding(objectState, 'wireframe')

      /* Point Light */
      const pointLightFolder = pane.addFolder({
        title: 'Point Light',
      })

      Object.keys(pointLightState).forEach(key => {
        pointLightFolder.addBinding(
          pointLightState,
          key as keyof PointLightState,
        )
      })

      /* Rect Area Light */
      const rectAreaLightFolder = pane.addFolder({
        title: 'Rect Area Light',
      })

      Object.keys(rectAreaLightState).forEach(key => {
        rectAreaLightFolder.addBinding(
          rectAreaLightState,
          key as keyof RectAreaLightState,
        )
      })

      /* Spot Area Light */
      const spotAreaLightFolder = pane.addFolder({
        title: 'Spot Area Light',
      })

      spotAreaLightFolder.addBinding(spotLightState, 'color')
      spotAreaLightFolder.addBinding(spotLightState, 'intensity')
      spotAreaLightFolder.addBinding(spotLightState, 'position')
      spotAreaLightFolder.addBinding(spotLightState, 'angle', {
        min: 0,
        max: Math.PI / 2,
      })
      spotAreaLightFolder.addBinding(spotLightState, 'distance')
      spotAreaLightFolder.addBinding(spotLightState, 'decay')
      spotAreaLightFolder.addBinding(spotLightState, 'penumbra', {
        min: 0,
        max: 1,
      })
    })
  })

  onUnmounted(() => {
    if (pane) {
      pane.dispose()
    }
  })

  return {
    pane,
    objectState,
    pointLightState,
    spotLightState,
    rectAreaLightState,
  }
}
